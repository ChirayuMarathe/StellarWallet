import { motion } from "framer-motion";
import {
  MessageCircle,
  Twitter,
  Github,
  FileText,
  Youtube,
  BookOpen,
} from "lucide-react";

const Community = () => {
  const engageLinks = [
    {
      icon: MessageCircle,
      name: "Discord",
      description: "Join our community discussions",
      link: "#",
    },
    {
      icon: MessageCircle,
      name: "Telegram",
      description: "Real-time chat with the community",
      link: "#",
    },
    {
      icon: Github,
      name: "Github",
      description: "Contribute to open source",
      link: "#",
    },
  ];

  const learnLinks = [
    {
      icon: Twitter,
      name: "Twitter",
      description: "Follow for latest updates",
      link: "#",
    },
    {
      icon: FileText,
      name: "Blog",
      description: "Read our latest articles",
      link: "#",
    },
    {
      icon: Youtube,
      name: "YouTube",
      description: "Watch tutorials and demos",
      link: "#",
    },
    {
      icon: BookOpen,
      name: "Documentation",
      description: "Learn how to use the platform",
      link: "#",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Join Our <span className="gradient-text">Community</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building the future of giving together. Connect with changemakers,
            developers, and donors from around the world.
          </p>
        </motion.div>

        {/* Engage Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-white">
            Engage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engageLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 group cursor-pointer"
              >
                <link.icon className="w-12 h-12 text-white/80 mb-6" strokeWidth={1.5} />
                <h3 
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '400',
                    fontSize: '1.5rem',
                    letterSpacing: '0.02em',
                  }}
                  className="text-white mb-3 group-hover:text-gray-300 transition-colors"
                >
                  {link.name}
                </h3>
                <p 
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '300',
                    fontSize: '0.95rem',
                    letterSpacing: '0.01em',
                    lineHeight: '1.6',
                  }}
                  className="text-gray-500"
                >
                  {link.description}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Learn Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-white">
            Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learnLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 group cursor-pointer"
              >
                <link.icon className="w-12 h-12 text-white/80 mb-4" strokeWidth={1.5} />
                <h3 
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '400',
                    fontSize: '1.25rem',
                    letterSpacing: '0.02em',
                  }}
                  className="text-white mb-3 group-hover:text-gray-300 transition-colors"
                >
                  {link.name}
                </h3>
                <p 
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '300',
                    fontSize: '0.9rem',
                    letterSpacing: '0.01em',
                    lineHeight: '1.6',
                  }}
                  className="text-gray-500"
                >
                  {link.description}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Community;
