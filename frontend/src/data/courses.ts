// src/data/courses.ts

export type Review = {
  name: string;
  rating: number; // 1–5
  comment: string;
};

export type Instructor = {
  name: string;
  title?: string;
  image?: string;
};

export type Course = {
  code: string;
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  details: string;
  originalPrice: string;
  discountPrice: string;
  discountPercentage: string;
  isRecorded: boolean;
  isLive: boolean;
  category: "new" | "popular" | "featured" | "all";
  features?: string[];
  instructor?: Instructor;
  reviews?: Review[];
};

export const courses: Course[] = [
  {
    code: "DFD",
    image: "/courses/dfd.png",
    title: "Diploma in Fashion Designing",
    subtitle: "Kickstart your career in fashion",
    description:
      "Comprehensive training in advanced fashion designing techniques.",
    details:
      "This program covers haute couture, textiles, and global design trends with hands-on workshops and projects.",
    originalPrice: "35,000",
    discountPrice: "24,500",
    discountPercentage: "30% off",
    isRecorded: true,
    isLive: true,
    category: "popular",
    features: [
      "Access to 50+ recorded lectures",
      "Weekly live Q&A with mentors",
      "Certification on completion",
      "Downloadable design resources",
    ],
    instructor: {
      name: "Priya Sharma",
      title: "Senior Fashion Designer",
      image: "/default-instructor.svg",
    },
    reviews: [
      {
        name: "Anita",
        rating: 5,
        comment: "Amazing course! I learned so much about textiles.",
      },
      {
        name: "Rahul",
        rating: 4,
        comment: "Great mentor, very supportive and knowledgeable.",
      },
    ],
  },
  {
    code: "MFD",
    image: "/courses/mfd.png",
    title: "Master in Fashion Designing",
    subtitle: "Advanced program for professionals",
    description:
      "Deep dive into fashion innovation and professional design practices.",
    details:
      "This program covers haute couture, textiles, and global design trends with hands-on workshops and projects.",
    originalPrice: "70,000",
    discountPrice: "45,500",
    discountPercentage: "35% off",
    isRecorded: true,
    isLive: true,
    category: "featured",
    features: [
      "1:1 mentorship sessions",
      "Industry case studies",
      "Portfolio building workshops",
      "Networking opportunities",
    ],
    instructor: {
      name: "Arjun Mehta",
      title: "Creative Director, LuxeWear",
      image: "/default-instructor.svg",
    },
    reviews: [
      {
        name: "Meena",
        rating: 5,
        comment: "Helped me land my first job as a designer!",
      },
      {
        name: "Vikram",
        rating: 4,
        comment: "Challenging but worth it — the portfolio project was gold.",
      },
    ],
  },
  {
    code: "PAE",
    image: "/courses/aec.png",
    title: "Aari Embroidery Class",
    subtitle: "Traditional art with modern touch",
    description:
      "Hands-on training in Aari embroidery techniques with cultural insights.",
    details:
      "This program covers haute couture, textiles, and global design trends with hands-on workshops and projects.",
    originalPrice: "15,000",
    discountPrice: "10,050",
    discountPercentage: "33% off",
    isRecorded: true,
    isLive: true,
    category: "new",
    features: [
      "Step-by-step embroidery tutorials",
      "Patterns and templates included",
      "Community support group",
    ],
    instructor: {
      name: "Lakshmi Nair",
      title: "Embroidery Specialist",
      image: "/default-instructor.svg",
    },
    reviews: [
      {
        name: "Kavya",
        rating: 5,
        comment: "Beautifully explained, I started creating designs in a week.",
      },
      {
        name: "Suresh",
        rating: 4,
        comment: "Loved the cultural context given along with the art.",
      },
    ],
  },
  {
    code: "MFDE",
    image: "/courses/mfd.png",
    title: "Master in Fashion Designing",
    subtitle: "Advanced program for professionals",
    description:
      "Deep dive into fashion innovation and professional design practices.",
    details:
      "This program covers haute couture, textiles, and global design trends with hands-on workshops and projects.",
    originalPrice: "70,000",
    discountPrice: "45,500",
    discountPercentage: "35% off",
    isRecorded: true,
    isLive: true,
    category: "featured",
    features: [
      "1:1 mentorship sessions",
      "Industry case studies",
      "Portfolio building workshops",
      "Networking opportunities",
    ],
    instructor: {
      name: "Arjun Mehta",
      title: "Creative Director, LuxeWear",
      image: "/default-instructor.svg",
    },
    reviews: [
      {
        name: "Meena",
        rating: 5,
        comment: "Helped me land my first job as a designer!",
      },
      {
        name: "Vikram",
        rating: 4,
        comment: "Challenging but worth it — the portfolio project was gold.",
      },
    ],
  },
  {
    code: "PAES",
    image: "/courses/aec.png",
    title: "Aari Embroidery Class",
    subtitle: "Traditional art with modern touch",
    description:
      "Hands-on training in Aari embroidery techniques with cultural insights.",
    details:
      "This program covers haute couture, textiles, and global design trends with hands-on workshops and projects.",
    originalPrice: "15,000",
    discountPrice: "10,050",
    discountPercentage: "33% off",
    isRecorded: true,
    isLive: true,
    category: "new",
    features: [
      "Step-by-step embroidery tutorials",
      "Patterns and templates included",
      "Community support group",
    ],
    instructor: {
      name: "Lakshmi Nair",
      title: "Embroidery Specialist",
      image: "/default-instructor.svg",
    },
    reviews: [
      {
        name: "Kavya",
        rating: 5,
        comment: "Beautifully explained, I started creating designs in a week.",
      },
      {
        name: "Suresh",
        rating: 4,
        comment: "Loved the cultural context given along with the art.",
      },
    ],
  }
];