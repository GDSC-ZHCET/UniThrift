import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import {
  AcademicCapIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";

// // Define navigation items
// const navigation = [
//   { name: 'Products', href: '/products' },
//   { name: 'Categories', href: '#categories' },
//   { name: 'How It Works', href: '#how-it-works' },
//   { name: 'About Us', href: '/about' },
// ];

// Define categories
const categories = [
  {
    id: 1,
    title: "Textbooks",
    description:
      "Find affordable textbooks for all your courses. Save up to 70% compared to campus bookstore prices.",
    href: "/category/textbooks",
    imageUrl:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Electronics",
    description:
      "Laptops, calculators, and other tech essentials at student-friendly prices.",
    href: "/category/electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Dorm & Apartment",
    description:
      "Everything you need to make your space comfortable from furniture to decor items.",
    href: "/category/dorm",
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  },
];

// Define features
const features = [
  {
    name: "Student-Verified Users",
    description:
      "Everyone on the platform is verified with a university email address for a safe and trusted community.",
    icon: UserCircleIcon,
  },
  {
    name: "On-Campus Exchange",
    description:
      "Meet on campus to exchange items, eliminating shipping costs and reducing environmental impact.",
    icon: AcademicCapIcon,
  },
  {
    name: "Secure Payments",
    description:
      "Our secure payment system protects buyers and sellers throughout the transaction process.",
    icon: ShoppingCartIcon,
  },
];

// Define testimonials
const testimonials = [
  {
    name: "Fatima",
    role: "Biology Major, Class of 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "UniThrift saved me over Rs.300 on textbooks last semester. I also sold my old calculator and made back almost what I paid for it!",
  },
  {
    name: "Shiraz",
    role: "Computer Science Major, Class of 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "The platform is super easy to use, and I love that I can meet people on campus for exchanges. No shipping fees and I can check the item before buying.",
  },
];

// Define footer navigation
const footerNavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

export default function HomePage() {
  // Mock currentUser state - in a real app, you would get this from auth context
  const currentUser = null; // Change to an object with user data to test logged-in state

  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <main>
          {/* Hero section */}
          <div className="pt-10 bg-[#111828] sm:pt-16 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Buy, sell, and save</span>
                      <span className="block text-green-200">
                        on university essentials
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-green-50 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Join the sustainable marketplace exclusively for
                      university students. Find affordable textbooks, dorm
                      essentials, and more, or sell what you no longer need.
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <form
                        action="/products"
                        className="bg-white rounded-md sm:max-w-xl sm:mx-auto lg:mx-0"
                      >
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="search" className="sr-only">
                              Search for items
                            </label>
                            <input
                              id="search"
                              type="text"
                              placeholder="Search for textbooks, furniture, electronics..."
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 cursor-pointer rounded-md shadow bg-green-500 text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900"
                            >
                              <SearchIcon className="h-5 w-5 inline mr-1" />
                              Search
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none rounded-lg shadow-xl"
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                      alt="Students using laptops"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category section */}
          <div
            className="relative bg-gray-50 py-16 sm:pt-24 lg:pt-32"
            id="categories"
          >
            <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
              <div>
                <h2 className="text-base font-semibold tracking-wider text-green-600 uppercase">
                  Categories
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Find what you need for campus life
                </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                  Browse our most popular categories for university essentials
                  at student-friendly prices.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover"
                        src={category.imageUrl}
                        alt={category.title}
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a href={category.href} className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">
                            {category.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {category.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-6">
                        <a
                          href={category.href}
                          className="text-base font-medium text-green-600 hover:text-green-500"
                        >
                          Browse category <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature section */}
          {/* How It Works Section */}
<div 
  className="relative bg-white py-16 sm:py-24 lg:py-32" 
  id="how-it-works"
>
  <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
    <h2 className="text-base font-semibold tracking-wider text-green-600 uppercase">
      How UniThrift Works
    </h2>
    <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
      A marketplace built by students, for students
    </p>
    <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
      UniThrift makes campus commerce simple, sustainable, and social. Buy and sell textbooks, 
      dorm essentials, and more with your campus community.
    </p>
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1: List Items */}
        <div className="pt-6">
          <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
            <div className="-mt-6">
              <div>
                <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                List Your Items
              </h3>
              <p className="mt-5 text-base text-gray-500">
                Take a photo, set your price, and list your unused textbooks, furniture, electronics, and more in just minutes. Include your campus location for easy meetups.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 2: Connect */}
        <div className="pt-6">
          <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
            <div className="-mt-6">
              <div>
                <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                Connect With Classmates
              </h3>
              <p className="mt-5 text-base text-gray-500">
                Chat safely through our platform with verified university email accounts. Arrange convenient on-campus meetups to exchange items and payment.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3: Save */}
        <div className="pt-6">
          <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
            <div className="-mt-6">
              <div>
                <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                Save Money & Space
              </h3>
              <p className="mt-5 text-base text-gray-500">
                Find textbooks at 40-70% off bookstore prices. Sell items you no longer need instead of storing or discarding them. Go green while keeping more green in your wallet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-10">
    <Link
  to="/how-it-works"
  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
>
  Learn more about our process
</Link>
    </div>
  </div>
</div>
          {/* Testimonial section */}
          <div className="pb-16 bg-gradient-to-r from-green-500 to-green-600 lg:pb-0 lg:z-10 lg:relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="relative lg:-my-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"
                />
                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                  <div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                    <img
                      className="object-cover lg:h-full lg:w-full"
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt="Students studying together"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                  <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    From Students, For Students
                  </h2>

                  <div className="mt-6 space-y-6">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 mb-6"
                      >
                        <div className="flex items-center">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                          />
                          <div className="ml-4">
                            <h4 className="text-lg font-bold text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-700">{testimonial.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          {/* Student Support CTA Section */}
          <div className="relative bg-gray-900">
            <div className="relative h-56 bg-green-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Students collaborating"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 mix-blend-multiply"
              />
            </div>
            <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
              <div className="md:ml-auto md:w-1/2 md:pl-10">
                <h2 className="text-base font-semibold uppercase tracking-wider text-green-300">
                  Student-focused support
                </h2>
                <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Help when you need it
                </p>
                <p className="mt-3 text-lg text-gray-300">
                  Have questions about buying or selling on UniThrift? Our
                  dedicated support team of fellow students is here to help you
                  navigate the marketplace, ensure secure transactions, and make
                  your university shopping experience seamless.
                </p>
                <div className="mt-8">
                  <div className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50"
                    >
                      Visit the student help center
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="-mr-1 ml-3 h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer
          className="bg-gray-50 flex justify-center w-full"
          aria-labelledby="footer-heading"
        >
          <div className="mt-12 border-t border-gray-200 py-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 UniThrift, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
