
import HeroSection from "../components/Home/HeroSection.jsx";
// import Category from "../components/Home/Category.jsx";
import CategoryCard from "../components/Home/CategoryCard";
import ProductCard from "../components/Home/ProductCard";
import { Button } from "../ui/button";
import PromotionalBanners from "../components/Home/PromotionalBanners";
import { Truck, Shield, HeadphonesIcon, RotateCcw, } from 'lucide-react';
import FeatureCard from "../components/Home/FeatureCard";
import NewsletterSection from "../components/NeweslstterSection";
import CartSheet, { CartItem } from "../components/CartSheet";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    name: 'Athletic Socks',
    image: 'https://images.unsplash.com/photo-1760177379331-a8b4311db4a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHNwb3J0cyUyMHNvY2tzfGVufDF8fHx8MTc2MTg4NzI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: '156 Styles',
  },
  {
    name: 'Casual Socks',
    image: 'https://images.unsplash.com/photo-1730923179125-4ae9a0cae968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBjb3R0b24lMjBzb2Nrc3xlbnwxfHx8fDE3NjE5MzU3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: '234 Styles',
  },
  {
    name: 'Dress Socks',
    image: 'https://images.unsplash.com/photo-1608357746078-342b38f738c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMGZvcm1hbCUyMHNvY2tzfGVufDF8fHx8MTc2MTkzNTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: '98 Styles',
  },
  {
    name: 'Winter Wool',
    image: 'https://images.unsplash.com/photo-1641399423016-b2804902e555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwd2ludGVyJTIwc29ja3N8ZW58MXx8fHwxNzYxOTM1NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    itemCount: '87 Styles',
  },
];
const FEATURED_PRODUCTS= [
  {
    id: '1',
    name: 'Premium Merino Wool Socks',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1641399423016-b2804902e555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwd2ludGVyJTIwc29ja3N8ZW58MXx8fHwxNzYxOTM1NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Winter',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    name: 'Athletic Performance Socks',
    price: 18.99,
    originalPrice: 25.99,
    image: 'https://images.unsplash.com/photo-1760177379331-a8b4311db4a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHNwb3J0cyUyMHNvY2tzfGVufDF8fHx8MTc2MTg4NzI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sports',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '3',
    name: 'Colorful Pattern Collection',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1730447619863-5349b3f6db70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXR0ZXJuZWQlMjBzb2Nrc3xlbnwxfHx8fDE3NjE4NDA1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Casual',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '4',
    name: 'Business Dress Socks',
    price: 19.99,
    originalPrice: 27.99,
    image: 'https://images.unsplash.com/photo-1608357746078-342b38f738c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMGZvcm1hbCUyMHNvY2tzfGVufDF8fHx8MTc2MTkzNTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dress',
    rating: 4.6,
    inStock: true,
  },
];

  
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeroSection />
      {/* <Category /> */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl mb-2 text-left">Shop by Style</h3>
            <p className="text-gray-600">Find the perfect socks for any occasion</p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
              itemCount={category.itemCount}
            />
          ))}
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl mb-2">Featured Socks</h3>
              <p className="text-gray-600">Our most popular styles on sale</p>
            </div>
            <Button variant="outline" className="flex" onClick={() => navigate('/collections')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        </div>
      </section>
      <PromotionalBanners />
      <section className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Truck}
              title="Free Shipping"
              description="On orders over 3000/-"
            />
            <FeatureCard
              icon={RotateCcw}
              title="Easy Returns"
              description="30-day return policy"
            />
            <FeatureCard
              icon={Shield}
              title="Quality Guarantee"
              description="Premium materials only"
            />
            <FeatureCard
              icon={HeadphonesIcon}
              title="24/7 Support"
              description="Dedicated customer service"
            />
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  );
};

export default HomePage;
