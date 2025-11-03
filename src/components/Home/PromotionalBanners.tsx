
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
const PromotionalBanners = () => {
    return(
    <>
      {/* Promotional Banners */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden group cursor-pointer">
            <CardContent className="p-0">
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1733410027829-c6622454c8b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNvY2tzfGVufDF8fHx8MTc2MTkzNTcwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Colorful Sock Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="p-8 text-white max-w-md">
                    <Badge className="mb-3 bg-red-500">Hot Deal</Badge>
                    <h4 className="text-3xl mb-3 text-left">Colorful Collection</h4>
                    <p className="mb-4 text-white/90 text-left">Express yourself with vibrant patterns and colors</p>
                    <Button variant="secondary" size="sm" className="gap-2">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden group cursor-pointer">
            <CardContent className="p-0">
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1640025867572-f6b3a8410c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wcmVzc2lvbiUyMHJ1bm5pbmclMjBzb2Nrc3xlbnwxfHx8fDE3NjE5MzU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Compression Socks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="p-8 text-white max-w-md">
                    <Badge className="mb-3 bg-blue-500">Performance</Badge>
                    <h4 className="text-3xl mb-3 text-left">Athletic Line</h4>
                    <p className="mb-4 text-white/90 text-left">Compression & support for peak performance</p>
                    <Button variant="secondary" size="sm" className="gap-2">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      </>
    )
}
export default PromotionalBanners;