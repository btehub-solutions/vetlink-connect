import { motion } from "framer-motion";
import { Package, Layers, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Products", value: 9, icon: Package },
  { label: "Categories", value: 3, icon: Layers },
  { label: "Locations", value: 2, icon: MapPin },
  { label: "Testimonials", value: 6, icon: MessageSquare },
];

const AdminDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Welcome to Admin Panel</h1>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <s.icon size={20} className="text-primary" />
            </div>
            <span className="text-2xl font-bold">{s.value}</span>
          </div>
          <p className="text-muted-foreground text-sm">{s.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="flex flex-wrap gap-3">
      <Link to="/admin/products" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Add New Product
      </Link>
      <Link to="/admin/products" className="px-5 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
        View All Products
      </Link>
    </div>
  </div>
);

export default AdminDashboard;
