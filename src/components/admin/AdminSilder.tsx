import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Plus, Pencil, Trash2, MoveUp, MoveDown } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Switch } from "../../ui/switch";
import { toast } from "sonner";
import sliderApi from "../../api/silderApi";

interface Slider {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  status: boolean;
  link: string;
  badge: string;
  // backgroundColor: string;
}

function AdminSliders() {
  const {getAllSliders, createSlider,updateSlider,deleteSlider, updatePositionSlider, updateStatusSlider} = sliderApi;
  const [sliders, setSliders] = useState<Slider[]>([]);
  const fetchSilders = async () => {
    try {
      const response = await getAllSliders();
      setSliders(response.data);
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
    }
  };
  useEffect(() => {
    fetchSilders();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    status: true,
    link: "",
    order: 1,
    badge: "",
    // backgroundColor: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSlider) {
      // Update existing slider
      setSliders(sliders.map(s => 
        s._id === editingSlider._id 
          ? { ...s, ...formData }
          : s
      ));
      await updateSlider(editingSlider._id, formData);
      console.log("Updated slider:", { _id: editingSlider._id, ...formData });
      toast.success("Slider updated successfully!");
    } else {
      // Add new slider
      const newSlider: Omit<Slider, '_id'>  = {
        title: formData.title,
        subTitle: formData.subTitle,
        description: formData.description,
        image: formData.image,
        buttonText: formData.buttonText,
        buttonLink: formData.buttonLink,
        status: formData.status,
        order: sliders.length + 1,
        link: formData.link,
        badge: formData.badge,
        // backgroundColor: formData.backgroundColor
      };
      const response = await createSlider(newSlider);
      try {
        const createdSlider = response.data;
        setSliders([...sliders, createdSlider]);
        console.log("Created slider:", createdSlider);
        toast.success("Slider created successfully!");
      } catch (error) {
        console.error("Failed to create slider:", error);
      }
    }
    
    resetForm();
    setDialogOpen(false);
  };

  const handleEdit = (slider: Slider) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      subTitle: slider.subTitle,
      description: slider.description,
      image: slider.image,
      buttonText: slider.buttonText,
      buttonLink: slider.buttonLink,
      status: slider.status,
      link: slider.link,
      order: slider.order,
      badge: slider.badge,
      // backgroundColor: slider.backgroundColor
    });
    setDialogOpen(true);
  };

  const handleDelete = async (_id: string) => {
    alert("Are you sure you want to delete this slider?");
    await deleteSlider(_id);
    fetchSilders();
    console.log("Deleted slider with id:", _id);
    toast.success("Slider deleted successfully!");
  };

  const handleToggleActive = async (id: string, status: boolean) => {
    await updateStatusSlider(id, status ? { status: false } : { status: true });
    fetchSilders();
    toast.success("Slider status updated!");
  };

  const moveSlider = async (id: string, direction: "up" | "down") => {
    const index = sliders.findIndex(s => s._id === id);
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
    
   await updatePositionSlider(id, { order: newSliders.find(s => s._id === id)?.order });
   fetchSilders();
    toast.success("Slider order updated!");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subTitle: "",
      description: "",
      image: "",
      buttonText: "Shop Now",
      buttonLink: "/collection",
      status: true,
      link: "",
      order: 1,
      badge: "",
      // backgroundColor: ""
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
                <label htmlFor="subTitle">subTitle / Badge</label>
                <input
                  id="subTitle"
                  value={formData.subTitle}
                  onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
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
              <div>
                <label htmlFor="badge">Badge Text</label>
                <input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g., Special Offer"
                  className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label htmlFor="status">Active Status</label>
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
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
            key={slider._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-0 shadow-lg overflow-hidden ${!slider.status ? "opacity-60" : ""}`}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={slider.image}
                    alt={slider.title}
                    className="w-full h-[300px] object-cover"
                  />
                  {!slider.status && (
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
                        <span className="text-purple-600">{slider.subTitle}</span>
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
                        onClick={() => moveSlider(slider._id, "up")}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveSlider(slider._id, "down")}
                        disabled={index === sliders.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={slider.status}
                        onCheckedChange={() => handleToggleActive(slider._id, slider.status)}
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
                        onClick={() => handleDelete(slider._id)}
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
          {sliders.length === 0 && (
           <div className="h-screen flex items-center justify-center">
            <h5 className="text-center text-gray-500">No sliders available</h5>
          </div>
          )}
      </div>
    </div>
  );
}
export default AdminSliders;