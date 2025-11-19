// src/pages/AboutPage.jsx
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Target, Eye, Award, Users, Leaf, Globe } from 'lucide-react';
import teamMembers from '../data/teamMembers';
import collaborators from '../data/collaborators';

const achievements = [
  { number: '10,000+', label: 'Clients Served' },
  { number: '50+', label: 'Projects Completed' },
  { number: '100MW', label: 'Clean Energy Installed' },
  { number: '250K tons', label: 'CO₂ Emissions Reduced' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-500" />
          <div className="absolute inset-0 bg-[url('/assets/images/about-hero.jpg')] opacity-30 dark:opacity-50" />
        </div>

        <div className="container mx-auto px-4 z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6"
            >
              <Users className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-white">Our Story</span>
            </motion.div>

            <h1 className="text-white mb-6">About Enervion</h1>

            <p className="text-xl text-purple-100 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
              Our mission is to drive sustainable energy solutions. We aim to accelerate the adoption of clean energy and renewable technologies, creating a greener and more sustainable future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#79ccea] dark:bg-gray-800 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 bg-[#a1d788] dark:bg-gray-900 border-green-200 hover:shadow-xl transition-shadow dark:border-green-700">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-800 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-green-600 dark:text-green-300" />
                  </div>
                  <h2 className="mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Enervion aims to accelerate the adoption of clean energy solutions through sustainable products and services, empowering communities to reduce their carbon footprint.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 bg-[#a1d788] dark:bg-gray-900 border-blue-200 hover:shadow-xl transition-shadow dark:border-blue-700">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h2 className="mb-4 text-gray-800 dark:text-gray-200">Our Vision</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    We envision a world where renewable energy and electric mobility are accessible to all, fostering sustainable cities and responsible energy consumption.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements / Impact */}
      <section className="py-20 bg-[#79ccea] dark:bg-gray-800 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">Our Impact</h2>
            <p className="text-gray-700 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Numbers that reflect our commitment to sustainable change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-gray-600 dark:text-gray-200 mb-2">{achievement.number}</div>
                <p className="text-gray-600 dark:text-gray-400">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#79ccea] dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-gray-800 dark:text-gray-200">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate experts dedicated to driving sustainable innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-shadow overflow-hidden bg-[#a1d788] dark:bg-gray-800">
                  <div className="relative h-64">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-1 text-gray-800 dark:text-gray-200">{member.name}</h3>
                    <p className="text-green-600 dark:text-green-300 mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio || ''}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Collaborators */}
      <section className="py-20 bg-[#79ccea] dark:bg-gray-800 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-gray-800 dark:text-gray-200">Our Partners & Collaborators</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Working together to build a sustainable future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborators.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow text-center bg-[#a1d788] dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-green-800 flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-green-600 dark:text-green-300" />
                    </div>
                    <h3 className="mb-2 text-gray-800 dark:text-gray-200">{partner.name}</h3>
                    {partner.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{partner.description}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Goals */}
      <section className="py-20 bg-[#79ccea] dark:bg-gray-800 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-green-600 dark:bg-green-700 flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h2 className="mb-4 text-gray-800 dark:text-gray-200">Sustainability Commitment</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Our commitment extends beyond products and services, promoting renewable energy adoption, carbon neutrality, and sustainable practices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Carbon Neutral by 2030',
                  description: 'Achieving complete carbon neutrality across all operations',
                },
                {
                  title: '100% Renewable Energy',
                  description: 'All facilities powered by renewable energy sources',
                },
                {
                  title: 'Zero Waste Manufacturing',
                  description: 'Implementing circular economy principles in production',
                },
                {
                  title: 'Community Education',
                  description: 'Free workshops on sustainable living and clean energy',
                },
              ].map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 bg-[#a1d788] dark:bg-gray-900 border-green-200 dark:border-green-700 transition-colors duration-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Award className="w-6 h-6 text-green-600 dark:text-green-300 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="mb-2 text-gray-800 dark:text-gray-200">{goal.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{goal.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
