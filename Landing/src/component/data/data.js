import Property1 from "@/assets/images/property/1.jpg";
import Property2 from "@/assets/images/property/2.jpg";
import Property3 from "@/assets/images/property/3.jpg";
import Property4 from "@/assets/images/property/4.jpg";
import Property5 from "@/assets/images/property/5.jpg";
import Property6 from "@/assets/images/property/6.jpg";

import SubProperty1 from "@/assets/images/property/single/1.jpg";
import SubProperty2 from "@/assets/images/property/single/2.jpg";
import SubProperty3 from "@/assets/images/property/single/3.jpg";
import SubProperty4 from "@/assets/images/property/single/4.jpg";
import SubProperty5 from "@/assets/images/property/single/5.jpg";

import client1 from "@/assets/images/client/01.jpg";
import client2 from "@/assets/images/client/02.jpg";
import client3 from "@/assets/images/client/03.jpg";
import client4 from "@/assets/images/client/04.jpg";
import client5 from "@/assets/images/client/05.jpg";
import client6 from "@/assets/images/client/06.jpg";
import client7 from "@/assets/images/client/07.jpg";
import client8 from "@/assets/images/client/08.jpg";

import cate1 from "@/assets/images/property/residential.jpg";
import cate2 from "@/assets/images/property/land.jpg";
import cate3 from "@/assets/images/property/commercial.jpg";
import cate4 from "@/assets/images/property/investment.jpg";
import cate5 from "@/assets/images/property/industrial.jpg";

import about1 from '@/assets/images/rent.png'
import about2 from '@/assets/images/buy.png'
import about3 from '@/assets/images/sell.png'

import agency1 from '@/assets/images/agency/1.png'
import agency2 from '@/assets/images/agency/2.png'
import agency3 from '@/assets/images/agency/3.png'
import agency4 from '@/assets/images/agency/4.png'
import agency5 from '@/assets/images/agency/5.png'
import agency6 from '@/assets/images/agency/6.png'
import agency7 from '@/assets/images/agency/7.png'
import agency8 from '@/assets/images/agency/8.png'
import agency9 from '@/assets/images/agency/9.png'

import {
  Briefcase,
  House,
  KeyRound,
  Trees,
  ShieldCheck,
  Rocket
} from 'lucide-vue-next'

export const properties = [
    {
        id: 1,
        image: Property1,
        name: 'Apartment 2403, Marina Gate Tower 2, Dubai Marina, Dubai, UAE',
        square: 185,
        beds: 2,
        baths: 3,
        price: 2850000,
        rating: 5.0,
        listingType: 'sale',
        detail: [SubProperty1, SubProperty2, SubProperty3, SubProperty4, SubProperty5]
    },
    {
        id: 2,
        image: Property2,
        name: 'Villa 12, Yas Acres, Yas Island, Abu Dhabi, UAE',
        square: 450,
        beds: 5,
        baths: 6,
        price: 5200000,
        rating: 5.0,
        detail: [SubProperty1, SubProperty2, SubProperty3, SubProperty4, SubProperty5]
    },
    {
        id: 3,
        image: Property3,
        name: 'Apartment 1802, Al Majaz Waterfront, Sharjah, UAE',
        square: 120,
        beds: 2,
        baths: 2,
        price: 890000,
        rating: 4.8,
        detail: [SubProperty1, SubProperty2, SubProperty3, SubProperty4, SubProperty5]
    },
    {
        id: 4,
        image: Property4,
        name: 'Penthouse, Atlantis Residences, Palm Jumeirah, Dubai, UAE',
        square: 320,
        beds: 4,
        baths: 5,
        price: 12500000,
        rating: 5.0,
        detail: [SubProperty1, SubProperty2, SubProperty3, SubProperty4, SubProperty5]
    },
    {
        id: 5,
        image: Property5,
        name: 'Unit 1102, Executive Towers, Business Bay, Dubai, UAE',
        square: 95,
        beds: 1,
        baths: 2,
        price: 1650000,
        rating: 4.9,
        detail: [SubProperty1, SubProperty2, SubProperty3, SubProperty4, SubProperty5]
    },
    {
        id: 6,
        image: Property6,
        name: 'Apartment 504, Sadaf 4, JBR, Dubai, UAE',
        square: 110,
        beds: 2,
        baths: 2,
        price: 2100000,
        rating: 4.7,
        listingType: 'sale',
        detail: [SubProperty1, SubProperty2, SubProperty3, SubProperty4, SubProperty5]
    },
    {
        id: 7,
        image: Property1,
        name: '2BR Apartment, Marina Gate, Dubai Marina — For Rent',
        square: 110,
        beds: 2,
        baths: 2,
        price: 145000,
        rating: 4.8,
        listingType: 'rent',
        detail: [SubProperty1, SubProperty2, SubProperty3]
    },
    {
        id: 8,
        image: Property3,
        name: 'Studio, Executive Towers, Business Bay — For Rent',
        square: 55,
        beds: 1,
        baths: 1,
        price: 72000,
        rating: 4.6,
        listingType: 'rent',
        detail: [SubProperty2, SubProperty3]
    },
    {
        id: 9,
        image: Property5,
        name: '3BR Villa, Arabian Ranches 2 — For Rent',
        square: 280,
        beds: 3,
        baths: 4,
        price: 220000,
        rating: 4.9,
        listingType: 'rent',
        detail: [SubProperty1, SubProperty4, SubProperty5]
    }
];

export const featureData = [
    {
        icon:House,
        title:'Evaluate Property',
        desc: 'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
    {
        icon:Briefcase,
        title:'Meeting with Agent',
        desc: 'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
    {
        icon:KeyRound,
        title:'Close the Deal',
        desc: 'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
]
export const review = [
    {
        id: '1',
        profile: client1,
        name: 'Calvin Carlo',
        designation: "Manager",
        description: "Kardosh Realty made buying our Dubai Marina apartment straightforward. We saved over AED 36,000 in fees and closed in three weeks."
    },
    {
        id: '2',
        profile: client2,
        name: 'Christa Smith',
        designation: "Manager",
        description: 'I listed my Business Bay studio on Kardosh Realty and received verified offers within 48 hours. Transparent pricing and RERA-ready documentation throughout.'
    }, {
        id: '3',
        profile: client3,
        name: 'Christa Smith',
        designation: "Manager",
        description: "My favorite part about selling my home myself was that we got to meet and get to know the people personally. This made it so much more enjoyable!"
    }, {
        id: '4',
        profile: client4,
        name: 'Christa Smith',
        designation: "Manager",
        description: "Great experience all around! Easy to use and efficient."
    }
]
export const teamdata = [
    {
        image: client4,
        name: 'Omar Al Hashimi',
        title: 'Senior Broker',
        linkedin: '',
        instagram: '',
        email: '',
    },
    {
        image: client5,
        name: 'Sarah Mitchell',
        title: 'Leasing Consultant',
        linkedin: '',
        instagram: '',
        email: '',
    },
    {
        image: client6,
        name: 'Rajesh Nair',
        title: 'Investment Advisor',
        linkedin: '',
        instagram: '',
        email: '',
    },
    {
        image: client7,
        name: 'Fatima Al Qasimi',
        title: 'Off-Plan Specialist',
        linkedin: '',
        instagram: '',
        email: '',
    },
    {
        image: client1,
        name: 'James Carter',
        title: 'Sales Director',
        linkedin: '',
        instagram: '',
        email: '',
    },
    {
        image: client8,
        name: 'Layla Mansour',
        title: 'Client Relations Manager',
        linkedin: '',
        instagram: '',
        email: '',
    },
]

export const counterData = [
    {
        target:'2400',
        title: 'Properties Sold'
    },
    {
        target:'18',
        title: 'Emirates Covered'
    },
    {
        target:'12',
        title: 'Years in UAE'
    },
]
export const categoriesData = [
    {
        image:cate1,
        name: 'Apartments',
        title: '846 Listings'
    },
    {
        image:cate2,
        name: 'Villas',
        title: '324 Listings'
    },
    {
        image:cate3,
        name: 'Commercial',
        title: '265 Listings'
    },
    {
        image:cate4,
        name: 'Off-Plan',
        title: '452 Listings'
    },
    {
        image:cate5,
        name: 'Investment',
        title: '128 Listings'
    },
]
export const featureTwo = [
    {
        icon: 'ri-heart-2-fill',
        title: 'Comfortable',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
    {
        icon: 'ri-shield-flash-fill',
        title: 'Extra Security',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
    {
        icon: 'ri-star-s-fill',
        title: 'Luxury',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
    {
        icon: 'ri-money-euro-circle-line',
        title: 'Best Value',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
    {
        icon: 'ri-map-pin-line',
        title: 'Prime UAE Locations',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
    {
        icon: 'ri-pie-chart-2-fill',
        title: 'Efficient',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
    },
]

export const pricing = [
    {
     icon:Trees,
     title:"Basic",
     amount:"199",
     features:["Full Access", "Source Files","Free Appointments","Enhanced Security"]
    },
    {
    icon:ShieldCheck,
    title:"Premium",
    amount:"399",
    features:["Full Access", "Source Files","Free Appointments","Enhanced Security"]
    },
    {
    icon:Rocket,
    title:"Business",
    amount:"999",
    features:["Full Access", "Source Files","Free Appointments","Enhanced Security"]
    }
]
export const accordionData = [
    {
        title: 'How does it work ?',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    },
    {
        title: 'Do I need a designer to use Kardosh Realty ?',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    },
    {
        title: 'What do I need to do to start selling ?',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    },
    {
        title: 'What happens when I receive an order ?',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    }
]
export  const blogList = [
    {
        id:1,
        title: "Guide to Buying Off-Plan Property in Dubai",
        date: "13th March, 2027",
        type: 'Industrial',
        image: Property1
    },
    {
        id:2,
        title: "RERA Rules Every UAE Buyer Should Know",
        date: "5th May, 2027",
        type: 'Industrial',
        image: Property2
    },
    {
        id:3,
        title: "10 Quick Tips About Business Development",
        date: "19th June, 2027",
        type: 'Industrial',
        image: Property3
    },
    {
        id:4,
        title: "14 Common Misconceptions About Business Development",
        date: "20th June, 2027",
        type: 'Industrial',
        image: Property4
    },
    {
        id:5,
        title: "10 Things Your Competitors Can Teach You About Real Estate",
        date: "31st Aug, 2027",
        type: 'Industrial',
        image: Property5
    },
    {
        id:6,
        title: "Why We Love Real Estate",
        date: "1st Sep, 2027",
        type: 'Industrial',
        image: Property6
    }
]

export const aboutData = [
    {
        image:about1,
        title:'Rent a House',
        desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
    {
        image:about2,
        title:'Buy a House',
        desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
    {
        image:about3,
        title:'Sell a House',
        desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
]

export const agentData = [
    {
        id:1,
        image:client4,
        name:'Omar Al Hashimi',
        position:'RERA Broker (Dubai)'
    },
    {
        id:2,
        image:client5,
        name:'Sarah Mitchell',
        position:'Leasing Consultant'
    },
    {
        id:3,
        image:client6,
        name:'Rajesh Nair',
        position:'Investment Advisor'
    },
    {
        id:4,
        image:client7,
        name:'Fatima Al Qasimi',
        position:'Off-Plan Specialist'
    },
    {
        id:5,
        image:client8,
        name:'Clayton Dalke',
        position:'Property Broker'
    },
    {
        id:6,
        image:client1,
        name:'Christopher Myers',
        position:'Property Broker'
    },
    {
        id:7,
        image:client2,
        name:'Mary Petersen',
        position:'Property Broker'
    },
    {
        id:8,
        image:client3,
        name:'Amber Durden',
        position:'Property Broker'
    },
]

export const agencyData = [
    {
        id:1,
        image:agency1,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:2,
        image:agency2,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:3,
        image:agency3,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:4,
        image:agency4,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:5,
        image:agency5,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:6,
        image:agency6,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:7,
        image:agency7,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:8,
        image:agency8,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
    {
        id:9,
        image:agency9,
        name:'Betterhomes UAE',
        title:'Real Estate Agency'
    },
]