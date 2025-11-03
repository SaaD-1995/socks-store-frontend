import { Card, CardContent } from '../../ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  image: string;
  itemCount: string;
}

const CategoryCard = ({ name, image, itemCount }: CategoryCardProps) => {
  return (
    <>
    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all">
      <CardContent className="p-0">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl mb-1">{name}</h3>
            <p className="text-sm text-white/80 mb-3">{itemCount}</p>
            <div className="flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
}

export default CategoryCard;
