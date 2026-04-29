import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#dce9e8] via-[#e8f0ef] to-[#d8e2dd]">

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-3]"
        style={{ backgroundImage: "url('/bgw.png')" }}
      />
      <div className="fixed inset-0 bg-[#315765]/20 z-[-2]" />

      <Navbar />

      <div className="mx-3 md:mx-6 mt-4 rounded-[34px] overflow-hidden bg-[#eef4f3]/80 backdrop-blur-xl border border-[#ffffff60] shadow-[0_20px_70px_rgba(0,0,0,0.12)]">

        {/* HERO */}
        <section className="px-6 md:px-12 pt-20 pb-16 text-center">

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[6px] text-[#7F5430] text-sm font-semibold"
          >
            Contact Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-4xl md:text-6xl font-serif text-[#315765]"
          >
            Let’s Build Something
            <span className="block bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] bg-clip-text text-transparent">
              Premium Together
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "180px" }}
            transition={{ delay: 0.4, duration: 1 }}
            className="h-[3px] mx-auto bg-gradient-to-r from-[#7F5430] via-[#74A8A4] to-transparent rounded-full mt-6"
          />

          <p className="mt-6 text-[#475569] max-w-2xl mx-auto text-lg">
            We’d love to hear from you. Reach out for partnerships, support,
            marketplace onboarding or custom development solutions.
          </p>

        </section>

        {/* MAIN */}
        <section className="px-6 md:px-12 pb-20">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-[30px] bg-[#eaf1f0] shadow-xl p-8"
            >

              <h2 className="text-3xl font-serif text-[#315765]">
                Contact Information
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Connect with KashmirCraft team for business inquiries,
                seller onboarding, marketplace support and collaborations.
              </p>

              {/* Info Cards */}
              <div className="mt-8 space-y-5">

                <div className="rounded-2xl bg-white p-5 shadow flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#315765] to-[#74A8A4] text-white flex items-center justify-center text-xl">
                    📍
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#315765] text-lg">
                      Office Address
                    </h3>
                    <p className="text-gray-600">
                      Srinagar, Jammu & Kashmir, India
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#315765] to-[#74A8A4] text-white flex items-center justify-center text-xl">
                    📧
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#315765] text-lg">
                      Email Address
                    </h3>
                    <a
                      href="mailto:info@softwalletinnovativetechnologies.cloud"
                      className="text-gray-600 hover:text-[#315765]"
                    >
                      info@softwalletinnovativetechnologies.cloud
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#315765] to-[#74A8A4] text-white flex items-center justify-center text-xl">
                    📞
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#315765] text-lg">
                      Phone Number
                    </h3>
                    <a
                      href="tel:9596393658"
                      className="text-gray-600 hover:text-[#315765]"
                    >
                      +91 9596393658
                    </a>
                  </div>
                </div>

              </div>

              {/* FORM */}
              <div className="mt-10">

                <h3 className="text-2xl font-serif text-[#315765] mb-5">
                  Send Message
                </h3>

                <form
                  action="https://formsubmit.co/info@softwalletinnovativetechnologies.cloud"
                  method="POST"
                  className="space-y-4"
                >

                  {/* Hidden Inputs */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Contact Message - KashmirCraft"
                  />
                  <input
                    type="hidden"
                    name="_template"
                    value="table"
                  />
                  <input
                    type="hidden"
                    name="_next"
                    value="http://localhost:5173/contact"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full px-5 py-4 rounded-xl bg-white outline-none border border-gray-200"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="w-full px-5 py-4 rounded-xl bg-white outline-none border border-gray-200"
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full px-5 py-4 rounded-xl bg-white outline-none border border-gray-200"
                  />

                  <textarea
                    rows="5"
                    name="message"
                    required
                    placeholder="Your Message"
                    className="w-full px-5 py-4 rounded-xl  text-gray-600 bg-white outline-none border border-gray-200 resize-none"
                  ></textarea>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] text-white font-semibold shadow-xl"
                  >
                    Send Message
                  </motion.button>

                </form>

              </div>

            </motion.div>

            {/* RIGHT MAP */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-[30px] overflow-hidden shadow-xl bg-white"
            >

              <div className="p-6 border-b">
                <h2 className="text-3xl font-serif text-[#315765]">
                  Find Us On Map
                </h2>

                <p className="text-gray-600 mt-2">
                  Srinagar, Jammu & Kashmir
                </p>
              </div>

              <iframe
                title="Srinagar Map"
                src="https://www.google.com/maps?q=Srinagar,Jammu%20and%20Kashmir&z=12&output=embed"
                width="100%"
                height="650"
                loading="lazy"
                className="border-0"
              ></iframe>

            </motion.div>

          </div>

        </section>

        {/* CTA */}
        <section className="mx-6 mb-20 rounded-[34px] overflow-hidden bg-gradient-to-r from-[#315765] via-[#74A8A4] to-[#7F5430] text-white text-center px-6 py-20">

          <h2 className="text-4xl md:text-5xl font-serif">
            Need Help Or Partnership?
          </h2>

          <p className="mt-4 text-lg text-white/90">
            Contact our team today and let’s grow together.
          </p>

          <a
            href="mailto:info@softwalletinnovativetechnologies.cloud"
            className="inline-block mt-8 px-8 py-4 rounded-full bg-white text-[#315765] font-semibold shadow-xl"
          >
            Contact Now
          </a>

        </section>

        {/* Footer */}
        <footer className="py-7 text-center text-[#315765] bg-[#dce9e8]">
          © 2026 KashmirCraft Marketplace. All rights reserved.
        </footer>

      </div>
    </div>
  );
}