import React from "react";
import { HeartIcon, BoltIcon, SparklesIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
const Category = () => {
    const categories = [
  {
    id: 1,
    name: "Casual",
    icon: HeartIcon,
    count: 120,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    name: "Athletic",
    icon: BoltIcon,
    count: 85,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Premium",
    icon: SparklesIcon,
    count: 95,
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 4,
    name: "Business",
    icon: BriefcaseIcon,
    count: 60,
    color: "from-gray-600 to-gray-800"
  }
];
  return (
    <>
  <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4 font-semibold text-2xl">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our carefully curated collections for every style and occasion
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                className="p-6 h-full hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-purple-200 rounded-xl"
              >
                <div className="text-center space-y-4">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-gray-500">{category.count} products</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
    </section>
    </>
  )
}
export default Category;