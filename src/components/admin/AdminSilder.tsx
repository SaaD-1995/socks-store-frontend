import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Pencil, Trash2, MoveUp, MoveDown } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Switch } from "../../ui/switch";
import { toast } from "sonner";
import { Label } from "recharts/types/component/Label";

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
}

function AdminSliders() {
  const [sliders, setSliders] = useState<Slider[]>([
    {
      id: 1,
      title: "Premium Comfort Collection",
      subtitle: "New Arrivals",
      description: "Experience ultimate comfort with our latest sock collection",
      image: "https://images.unsplash.com/photo-1615486364462-ef6363adbc18?w=800",
      buttonText: "Shop Now",
      buttonLink: "/collection",
      order: 1,
      isActive: true
    },
    {
      id: 2,
      title: "Athletic Performance",
      subtitle: "Best Sellers",
      description: "High-performance socks for athletes and active lifestyles",
      image: "https://images.unsplash.com/photo-1608357746078-342b38f738c1?w=800",
      buttonText: "View Collection",
      buttonLink: "/collection",
      order: 2,
      isActive: true
    },
    {
      id: 3,
      title: "Winter Warmth",
      subtitle: "Seasonal Collection",
      description: "Cozy wool socks to keep your feet warm all winter",
      image: "https://images.unsplash.com/photo-1647549897410-3583914a7961?w=800",
      buttonText: "Explore",
      buttonLink: "/collection",
      order: 3,
      isActive: false
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    buttonText: "Shop Now",
    buttonLink: "/collection",
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSlider) {
      // Update existing slider
      setSliders(sliders.map(s => 
        s.id === editingSlider.id 
          ? { ...s, ...formData }
          : s
      ));
      toast.success("Slider updated successfully!");
    } else {
      // Add new slider
      const newSlider: Slider = {
        id: sliders.length + 1,
        ...formData,
        order: sliders.length + 1
      };
      setSliders([...sliders, newSlider]);
      toast.success("Slider added successfully!");
    }
    
    resetForm();
    setDialogOpen(false);
  };

  const handleEdit = (slider: Slider) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      subtitle: slider.subtitle,
      description: slider.description,
      image: slider.image,
      buttonText: slider.buttonText,
      buttonLink: slider.buttonLink,
      isActive: slider.isActive
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSliders(sliders.filter(s => s.id !== id));
    toast.success("Slider deleted successfully!");
  };

  const handleToggleActive = (id: number) => {
    setSliders(sliders.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    toast.success("Slider status updated!");
  };

  const moveSlider = (id: number, direction: "up" | "down") => {
    const index = sliders.findIndex(s => s.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sliders.length - 1)
    ) {
      return;
    }

    const newSliders = [...sliders];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newSliders[index], newSliders[swapIndex]] = [newSliders[swapIndex], newSliders[index]];
    
    // Update order numbers
    newSliders.forEach((slider, idx) => {
      slider.order = idx + 1;
    });
    
    setSliders(newSliders);
    toast.success("Slider order updated!");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      buttonText: "Shop Now",
      buttonLink: "/collection",
      isActive: true
    });
    setEditingSlider(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="mb-2">Slider Management</h1>
          <p className="text-gray-600">Manage hero sliders and promotional banners</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Slider
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSlider ? "Edit Slider" : "Add New Slider"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subtitle">Subtitle / Badge</label>
                <input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g., New Arrivals, Best Sellers"
                  required
                  className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label htmlFor="title">Main Title</label>
                <input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter main heading"
                  required
                  className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter slider description"
                  rows={3}
                  className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label htmlFor="image">Image URL</label>
                <input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="buttonText">Button Text</label>
                  <input
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    placeholder="Shop Now"
                    required
                    className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label htmlFor="buttonLink">Button Link</label>
                  <input
                    id="buttonLink"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    placeholder="/collection"
                    required
                    className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label htmlFor="isActive">Active Status</label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  {editingSlider ? "Update Slider" : "Add Slider"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 gap-6">
        {sliders.map((slider, index) => (
          <motion.div
            key={slider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-0 shadow-lg overflow-hidden ${!slider.isActive ? "opacity-60" : ""}`}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={slider.image}
                    alt={slider.title}
                    className="w-full h-[300px] object-cover"
                  />
                  {!slider.isActive && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 bg-white text-gray-900 rounded-full">Inactive</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-purple-600">{slider.subtitle}</span>
                        <h3 className="mt-1">{slider.title}</h3>
                      </div>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        Order #{slider.order}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{slider.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Button variant="outline" size="sm">{slider.buttonText}</Button>
                      <span className="text-gray-500">→ {slider.buttonLink}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveSlider(slider.id, "up")}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveSlider(slider.id, "down")}
                        disabled={index === sliders.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={slider.isActive}
                        onCheckedChange={() => handleToggleActive(slider.id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(slider)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(slider.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default AdminSliders;