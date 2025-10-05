import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Globe, Shield, Linkedin } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Decentralization",
      description: "Empowering communities through blockchain technology",
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Open and verifiable transactions on-chain",
    },
    {
      icon: Users,
      title: "Innovation",
      description: "Building cutting-edge DeFi infrastructure",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Audited smart contracts and secure protocols",
    },
  ];

  const team = [
    {
      name: "Parth Parmar",
      role: "AI/ML Engineer",
      description: "Leading AI and machine learning initiatives, focusing on intelligent blockchain analytics and predictive modeling for DeFi optimization.",
      linkedin: "https://www.linkedin.com/in/parthparmar04/",
      image: "/team/parth.jpg"
    },
    {
      name: "Chirayu Marathe",
      role: "Full-Stack Developer",
      description: "Expert frontend developer with strong backend skills, specializing in creating seamless user experiences and robust blockchain applications.",
      linkedin: "https://www.linkedin.com/in/chirayu-marathe69/",
      image: "/team/chirayu.jpg"
    },
    {
      name: "Gaurav Patil",
      role: "GenAI & Deep Learning Engineer",
      description: "GenAI and deep learning practitioner working on agentic AI use cases and high-impact, efficient LLM pipelines; hands-on coder specializing in rapid prototyping.",
      linkedin: "https://www.linkedin.com/in/gauravpatil2515/",
      image: "/team/gaurav.jpg"
    },
    {
      name: "Suhail Shaikh",
      role: "Data Scientist",
      description: "Data scientist specializing in blockchain analytics, predictive modeling, and extracting actionable insights from decentralized finance data.",
      linkedin: "https://www.linkedin.com/in/suhail-shaikh-378897283/",
      image: "/team/suhail.jpg"
    },
    {
      name: "Aditya Mishra",
      role: "Research Engineer",
      description: "Research engineer focused on exploring emerging technologies, conducting technical research, and developing innovative solutions for blockchain challenges.",
      linkedin: "https://www.linkedin.com/in/aditya-mishra-878ba4212/",
      image: "/team/aditya.jpg"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container-custom max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
            className="text-white mb-6"
          >
            ABOUT <span style={{ fontWeight: "400" }}>CHAINFUND</span>
          </h1>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "1.25rem",
              letterSpacing: "0.01em",
            }}
            className="text-gray-400"
          >
            Empowering blockchain innovation through transparent crowdfunding and decentralized giving
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 mb-12"
        >
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
              <Target className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "2rem",
                  letterSpacing: "0.02em",
                }}
                className="text-white mb-4"
              >
                Our Mission
              </h2>
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "300",
                  fontSize: "1.125rem",
                  letterSpacing: "0.01em",
                  lineHeight: "1.8",
                }}
                className="text-gray-400"
              >
                ChainFund is revolutionizing blockchain crowdfunding by connecting innovative projects with global supporters through transparent, decentralized giving. We provide a secure platform where verified projects can raise funds for sustainable development, emerging technologies, and social impact initiatives, all powered by Stellar's efficient blockchain infrastructure.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 mb-20"
        >
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
              <Eye className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "2rem",
                  letterSpacing: "0.02em",
                }}
                className="text-white mb-4"
              >
                Our Vision
              </h2>
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "300",
                  fontSize: "1.125rem",
                  letterSpacing: "0.01em",
                  lineHeight: "1.8",
                }}
                className="text-gray-400"
              >
                We envision a world where blockchain crowdfunding empowers every innovative project to access global funding transparently and efficiently. Where supporters can directly fund real-world impact in sustainable development, education, healthcare, and emerging technologies. Where decentralized giving creates lasting positive change without intermediaries or barriers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "400",
              fontSize: "2rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
            className="mb-8 text-white text-center"
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300"
              >
                <value.icon
                  className="w-12 h-12 text-gray-400 mb-4"
                  strokeWidth={1.5}
                />
                <h3
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "400",
                    fontSize: "1.5rem",
                    letterSpacing: "0.02em",
                  }}
                  className="mb-3 text-white"
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "1rem",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                  }}
                  className="text-gray-500"
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <h2
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "400",
              fontSize: "2rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
            className="mb-12 text-white text-center"
          >
            Meet the Team
          </h2>
          <div className="flex flex-col items-center space-y-8">
            {/* First row - 2 members */}
            <div className="flex justify-center gap-8">
              {team.slice(0, 2).map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 text-center w-80"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "400",
                      fontSize: "1.25rem",
                      letterSpacing: "0.02em",
                    }}
                    className="text-white mb-2"
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                      fontSize: "0.875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                    className="text-gray-400 mb-3"
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                      fontSize: "0.95rem",
                      letterSpacing: "0.01em",
                      lineHeight: "1.6",
                    }}
                    className="text-gray-500 mb-4"
                  >
                    {member.description}
                  </p>
                  {member.linkedin !== "#" && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Second row - 3 members */}
            <div className="flex flex-wrap justify-center gap-8">
              {team.slice(2, 5).map((member, index) => (
                <motion.div
                  key={index + 2}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 2) }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 text-center w-80"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "400",
                      fontSize: "1.25rem",
                      letterSpacing: "0.02em",
                    }}
                    className="text-white mb-2"
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                      fontSize: "0.875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                    className="text-gray-400 mb-3"
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                      fontSize: "0.95rem",
                      letterSpacing: "0.01em",
                      lineHeight: "1.6",
                    }}
                    className="text-gray-500 mb-4"
                  >
                    {member.description}
                  </p>
                  {member.linkedin !== "#" && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
