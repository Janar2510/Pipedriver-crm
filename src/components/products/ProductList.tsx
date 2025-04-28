import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Package, ArrowUpDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import type { Product } from '../../types';

export const ProductList: React.FC = () => {
  const { products } = useCRM();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === 'asc'
        ? a.price - b.price
        : b.price - a.price;
    }
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Products</h1>
          <p className="text-dark-400">Manage your product catalog</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />}>
          Add Product
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={18} />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-dark-800 border border-dark-700 rounded-md px-3 py-2 text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="sm"
                icon={<Filter size={16} />}
              >
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-dark-900 rounded-lg border border-dark-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-800">
              <th className="px-6 py-3 text-left">
                <button 
                  className="flex items-center text-sm font-medium text-dark-400"
                  onClick={() => {
                    if (sortBy === 'name') {
                      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('name');
                      setSortDirection('asc');
                    }
                  }}
                >
                  Product
                  {sortBy === 'name' && <ArrowUpDown size={14} className="ml-1" />}
                </button>
              </th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">
                <button 
                  className="flex items-center text-sm font-medium text-dark-400"
                  onClick={() => {
                    if (sortBy === 'price') {
                      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('price');
                      setSortDirection('asc');
                    }
                  }}
                >
                  Price
                  {sortBy === 'price' && <ArrowUpDown size={14} className="ml-1" />}
                </button>
              </th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-800">
            {sortedProducts.map(product => (
              <tr key={product.id} className="hover:bg-dark-800">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Package size={20} className="text-dark-400 mr-3" />
                    <div>
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-sm text-dark-400">{product.code}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="secondary">{product.category}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">
                    {formatCurrency(product.price, product.currency)}
                  </div>
                  <div className="text-sm text-dark-400">
                    per {product.unit}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={product.active ? 'success' : 'danger'}
                  >
                    {product.active ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};