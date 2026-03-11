import { ChatInterface } from "./components/ChatInterface";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFBC0D] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl h-[85vh] flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Branding/Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col justify-center text-white space-y-6"
        >
          <div className="space-y-2">
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src="https://mcdelivery.co.in/assets/images/mcd_logo.png" 
              alt="McDonald's Logo" 
              className="w-24 h-24 object-contain mb-4"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-red-600">
              I'm lovin' it.
            </h1>
            <p className="text-xl md:text-2xl font-medium text-red-700 opacity-90">
              Your personal McDelivery Assistant is here to help you find the perfect meal.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
              <h3 className="font-bold text-red-800">Menu Help</h3>
              <p className="text-sm text-red-900/80">Find burgers, wraps, and more.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
              <h3 className="font-bold text-red-800">Latest Offers</h3>
              <p className="text-sm text-red-900/80">Get the best deals today.</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-h-[500px]"
        >
          <ChatInterface />
        </motion.div>
      </div>
    </div>
  );
}
