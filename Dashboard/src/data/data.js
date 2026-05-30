import property1 from '@/assets/images/property/1.jpg'
import property2 from '@/assets/images/property/2.jpg'
import property3 from '@/assets/images/property/3.jpg'
import property4 from '@/assets/images/property/4.jpg'
import property5 from '@/assets/images/property/5.jpg'
import property6 from '@/assets/images/property/6.jpg'
import property7 from '@/assets/images/property/7.jpg'
import property8 from '@/assets/images/property/8.jpg'
import property9 from '@/assets/images/property/9.jpg'
import property10 from '@/assets/images/property/10.jpg'
import property11 from '@/assets/images/property/11.jpg'
import property12 from '@/assets/images/property/12.jpg'

import client1 from '@/assets/images/client/01.jpg'
import client2 from '@/assets/images/client/02.jpg'
import client3 from '@/assets/images/client/03.jpg'
import client4 from '@/assets/images/client/04.jpg'
import client5 from '@/assets/images/client/05.jpg'
import client6 from '@/assets/images/client/06.jpg'
import client7 from '@/assets/images/client/07.jpg'
import client8 from '@/assets/images/client/08.jpg'
import client9 from '@/assets/images/client/09.jpg'
import client10 from '@/assets/images/client/10.jpg'
import client11 from '@/assets/images/client/11.jpg'
import client12 from '@/assets/images/client/12.jpg'
import client13 from '@/assets/images/client/13.jpg'

export const counterData = [
    {
        icon:'ri-mail-line',
        title:'New inquiries',
        target:'12',
        symbol:''
    },
    {
        icon:'ri-building-line',
        title:'Off-plan projects',
        target:'186',
        symbol:''
    },
    {
        icon:'ri-community-line',
        title:'Developers',
        target:'42',
        symbol:''
    },
    {
        icon:'ri-map-pin-line',
        title:'Communities',
        target:'28',
        symbol:''
    },
    {
        icon:'ri-chat-quote-line',
        title:'Testimonials',
        target:'9',
        symbol:''
    },
]

// Inquiry sources (dashboard "Inquiry Sources" panel)
export const salesData = [
    {
        title:'Website form',
        sale:'52%'
    },
    {
        title:'WhatsApp',
        sale:'21%'
    },
    {
        title:'Referral',
        sale:'14%'
    },
    {
        title:'Social media',
        sale:'9%'
    },
    {
        title:'Walk-in',
        sale:'4%'
    },
]

// Recent inquiries (dashboard table)
export const recentInquiries = [
    {
        date:'13th May 2026',
        name: 'Sarah M.',
        interest:'Off-plan',
        project:'Creek Vista Grande',
        status: 'New'
    },
    {
        date:'12th May 2026',
        name: 'Ahmed K.',
        interest:'Off-plan',
        project:'DAMAC Bay',
        status: 'Contacted'
    },
    {
        date:'11th May 2026',
        name: 'Daniel R.',
        interest:'Investment',
        project:'Sobha One',
        status: 'New'
    },
    {
        date:'10th May 2026',
        name: 'Ms. Cally',
        interest:'Resale',
        project:'Marina Gate',
        status: 'Contacted'
    },
    {
        date:'9th May 2026',
        name: 'Priya S.',
        interest:'Off-plan',
        project:'Bugatti Residences',
        status: 'New'
    },
]

// Popular area projects (dashboard "Popular Areas" panel)
export const popularAreas = [
    { name:'Dubai Marina', projects:14, rate:'+12%', status:'up' },
    { name:'Downtown Dubai', projects:18, rate:'+9%', status:'up' },
    { name:'Business Bay', projects:12, rate:'+6%', status:'up' },
    { name:'Palm Jumeirah', projects:9, rate:'-3%', status:'down' },
    { name:'Dubai Hills Estate', projects:11, rate:'+5%', status:'up' },
    { name:'JVC', projects:16, rate:'+8%', status:'up' },
]

// Top projects (dashboard "Top Projects" panel)
export const topProperties = [
    {
        image:property1,
        name: 'Creek Vista Grande',
        loction:'Dubai Creek Harbour',
        rate:'24%',
        status:'up'
    },
    {
        image:property2,
        name: 'DAMAC Bay',
        loction:'Dubai Harbour',
        rate:'20%',
        status:'up'
    },
    {
        image:property3,
        name: 'Sobha One',
        loction:'Ras Al Khor',
        rate:'18%',
        status:'up'
    },
    {
        image:property4,
        name: 'Palm Beach Towers',
        loction:'Palm Jumeirah',
        rate:'11%',
        status:'down'
    },
    {
        image:property5,
        name: 'Address Residences',
        loction:'Dubai Hills',
        rate:'15%',
        status:'up'
    },
]

export const propertiesData = [
    {
        id:1,
        image:property1,
        name: 'Apartment 2403, Marina Gate Tower 2, Dubai Marina, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000', 
    },
    {
        id:2,
        image:property2,
        name: 'Villa 12, Yas Acres, Yas Island, Abu Dhabi, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:3,
        image:property3,
        name: 'Apartment 1802, Al Majaz Waterfront, Sharjah, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:4,
        image:property4,
        name: 'Penthouse, Atlantis Residences, Palm Jumeirah, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:5,
        image:property5,
        name: 'Unit 1102, Executive Towers, Business Bay, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:6,
        image:property6,
        name: 'Apartment 504, Sadaf 4, JBR, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:7,
        image:property7,
        name: 'Townhouse, Arabian Ranches 2, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:8,
        image:property8,
        name: 'Studio, Bluewaters Residences, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:9,
        image:property9,
        name: 'Villa, Saadiyat Island, Abu Dhabi, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:10,
        image:property10,
        name: 'Apartment, Al Reem Island, Abu Dhabi, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:11,
        image:property11,
        name: 'Penthouse, Dubai Creek Harbour, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
    {
        id:12,
        image:property12,
        name: 'Office, DIFC Gate Village, Dubai, UAE',
        sqf:'185 sqm',
        beds:'4 Beds',
        baths:'4 Baths',
        value:'AED 2,850,000',  
    },
]

export const chatData = [
    {
        image:client7,
        name: 'Christopher',
        msg:'Hello',
        time:'10 Min',
        status: 'online',
        unReadMsg : '',
        bg:'true'
    },
    {
        image:client1,
        name: 'Dr. Cristino',
        msg:'Hi, How are you?',
        time:'20 Min',
        status: 'offline',
        unReadMsg : '2',
        bg:'false'
    },
    {
        image:client3,
        name: 'Faye',
        msg:'Heyy',
        time:'30 Min',
        status: 'offline',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client4,
        name: 'Ronald',
        msg:'Hey, How are you sir?',
        time:'2 Hours',
        status: 'offline',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client11,
        name: 'Melissa',
        msg:'Good Afternoon',
        time:'3 Hours',
        status: 'online',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client12,
        name: 'Elsie',
        msg:'Good Morning sir, how can i help you?',
        time:'10 Hours',
        status: 'online',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client7,
        name: 'Jerry',
        msg:'Please give me appointment',
        time:'16 Hours',
        status: 'online',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client13,
        name: 'Louis',
        msg:'Hii',
        time:'1 Days',
        status: 'offline',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client6,
        name: 'Randall',
        msg:'Hello Sir',
        time:'2 Days',
        status: 'offline',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client10,
        name: 'Mary',
        msg:'How are you sir?',
        time:'3 Days',
        status: 'offline',
        unReadMsg : '',
        bg:'false'
    },
    {
        image:client8,
        name: 'Lester',
        msg:'Hello please give me answer.',
        time:'4 Days',
        status: 'online',
        unReadMsg : '',
        bg:'false'
    },
]

export const blogData = [
    {
        id:1,
        image:property1,
        title: 'Skills That You Can Learn In The Real Estate Market',
        date:'13th Sep 2027',
        time:'5 min read',
        tag:'Residential',
    },
    {
        id:2,
        image:property2,
        title: 'Learn The Truth About Real Estate Industry',
        date:'29th Nov 2027',
        time:'5 min read',
        tag:'Land',
    },
    {
        id:3,
        image:property3,
        title: '10 Quick Tips About Business Development',
        date:'29th Dec 2027',
        time:'5 min read',
        tag:'Commercial',
    },
    {
        id:4,
        image:property4,
        title: '14 Common Misconceptions About Business Development',
        date:'13th March 2027',
        time:'5 min read',
        tag:'Industrial',
    },
    {
        id:5,
        image:property5,
        title: '10 Things Your Competitors Can Teach You About Real Estate',
        date:'5th May 2027',
        time:'5 min read',
        tag:'Investment',
    },
    {
        id:6,
        image:property6,
        title: 'Why We Love Real Estate',
        date:'19th June 2027',
        time:'5 min read',
        tag:'Residential',
    },
    {
        id:7,
        image:property7,
        title: '110 Quick Tips About Real Estate',
        date:'20th June 2027',
        time:'5 min read',
        tag:'Land',
    },
    {
        id:8,
        image:property8,
        title: '15 Best Blogs To Follow About Real Estate',
        date:'31st Aug 2027',
        time:'5 min read',
        tag:'Commercial',
    },
]
export const recentPost = [
    {
        image:property6,
        title:'10 Things You About Real Estate',
        date: '13th March 2027'
    },
    {
        image:property7,
        title:'Why We Love Real Estate',
        date: '5th May 2027'
    },
    {
        image:property8,
        title:'110 Quick Tips About Real Estate',
        date: '19th June 2027'
    },
]

export const accordianData = [
    {
        title:'How does it work ?',
        desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    },
    {
        title:'Do I need a designer to use Hously ?',
        desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    },
    {
        title:'What do I need to do to start selling ?',
        desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    },
    {
        title:'What happens when I receive an order ?',
        desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    },
]

export const pricingData = [
    {
        icon:'ri-tree-line',
        title: 'Basic',
        amount: '199',
        feature:['Full Access', 'Source Files', 'Free Appointments', 'Enhanced Security']
    },
    {
        icon:'ri-shield-star-line',
        title: 'Premium',
        amount: '399',
        feature:['Full Access', 'Source Files', 'Free Appointments', 'Enhanced Security']
    },
    {
        icon:'ri-rocket-2-line',
        title: 'Business',
        amount: '999',
        feature:['Full Access', 'Source Files', 'Free Appointments', 'Enhanced Security']
    },
]
export const reviewData = [
    {
        image: client1,
        name: 'Thomas Israel',
        title: 'Student',
        desc:"I didn't know a thing about icon design until I read this book. Now I can create any icon I need in no time. Great resource!"
    },
    {
        image: client2,
        name: 'Barbara McIntosh',
        title: 'Student',
        desc:"There are so many things I had to do with my old software that I just don't do at all with Hously. Suspicious but I can't say I don't love it."
    },
    {
        image: client3,
        name: 'Carl Oliver',
        title: 'Student',
        desc:"The best part about Hously is every time I pay my employees, my bank balance doesn't go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined."
    },
    {
        image: client4,
        name: 'Jill Webb',
        title: 'Student',
        desc:"I'm trying to get a hold of someone in support, I'm in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away."
    },
    {
        image: client5,
        name: 'Barbara McIntosh',
        title: 'Student',
        desc:"I used to have to remit tax to the EU and with Hously I somehow don't have to do that anymore. Nervous to travel there now though."
    },
    {
        image: client6,
        name: 'Janisha Doll',
        title: 'Student',
        desc:"This is the fourth email I've sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important."
    },
    {
        image: client7,
        name: 'Thomas Israel',
        title: 'Student',
        desc:"I didn't know a thing about icon design until I read this book. Now I can create any icon I need in no time. Great resource!"
    },
    {
        image: client8,
        name: 'Barbara McIntosh',
        title: 'Student',
        desc:"There are so many things I had to do with my old software that I just don't do at all with Hously. Suspicious but I can't say I don't love it."
    },
    {
        image: client9,
        name: 'Carl Oliver',
        title: 'Student',
        desc:"The best part about Hously is every time I pay my employees, my bank balance doesn't go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined."
    },
    {
        image: client10,
        name: 'Jill Webb',
        title: 'Student',
        desc:"I'm trying to get a hold of someone in support, I'm in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away."
    },
    {
        image: client11,
        name: 'Barbara McIntosh',
        title: 'Student',
        desc:"I used to have to remit tax to the EU and with Hously I somehow don't have to do that anymore. Nervous to travel there now though"
    },
    {
        image: client12,
        name: 'Janisha Doll',
        title: 'Student',
        desc:"This is the fourth email I've sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important."
    },
    {
        image: client13,
        name: 'Thomas Israel',
        title: 'Student',
        desc:"I didn't know a thing about icon design until I read this book. Now I can create any icon I need in no time. Great resource!"
    },
    {
        image: client1,
        name: 'Barbara McIntosh',
        title: 'Student',
        desc:"There are so many things I had to do with my old software that I just don't do at all with Hously. Suspicious but I can't say I don't love it."
    },
    {
        image: client2,
        name: 'Carl Oliver',
        title: 'Student',
        desc:"The best part about Hously is every time I pay my employees, my bank balance doesn't go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined."
    },
]

export const invoiceData = [ 
    {
        image:client1,
        no:'#h001',
        name:'Howard Tanner',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Unpaid'
    },
    {
        image:client2,
        no:'#h002',
        name:'Wendy Filson',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Paid'
    },
    {
        image:client3,
        no:'#h003',
        name:'Faye Bridger',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Unpaid'
    },
    {
        image:client4,
        no:'#h004',
        name:'Ronald Curtis',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Paid'
    },
    {
        image:client5,
        no:'#h005',
        name:'Melissa Hibner',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Unpaid'
    },
    {
        image:client6,
        no:'#h006',
        name:'Randall Case',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Paid'
    },
    {
        image:client7,
        no:'#h007',
        name:'Jerry Morena',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Paid'
    },
    {
        image:client8,
        no:'#h008',
        name:'Lester McNally',
        phone:'+971 50 123 4567',
        amount:'AED 1,250',
        date:'16th Aug 2027',
        status:'Paid'
    },
]

export const inboxData = [
    {
        star : false,
        name : 'Calvin Carlo',
        subject : 'Hously Customization',
        time : '03:05PM'
    },
    {
        star : false,
        name : 'Madeleine Jackson',
        subject : 'User-friendly value-added application 😊',
        time : '12:00PM'
    },
    {
        star : true,
        name : 'Sherrie Miller',
        subject : 'Focused impactful open system 📷 😃',
        time : '8hours ago'
    },
    {
        star : false,
        name : 'John Belgrave',
        subject : 'Profound systemic alliance 🎉 🎊',
        time : '20hours ago'
    },
    {
        star : false,
        name : 'Jimmy Bojorquez',
        subject : 'Organized value-added model',
        time : '13th March 2027'
    },
    {
        star : false,
        name : 'Louise Stewart',
        subject : 'Waterfall Model Update',
        time : '6th May 2027'
    },
    {
        star : false,
        name : 'Kelly Hair',
        subject : 'Company Report',
        time : '19th June 2027'
    },
    {
        star : true,
        name : 'Ester Casella',
        subject : 'Theme Update',
        time : '20th June 2027'
    },
    {
        star : true,
        name : 'Richard Benavides',
        subject : 'Your product has been updated!',
        time : '31st August 2027'
    },
    {
        star : false,
        name : 'Calvin Hudson',
        subject : 'ThemeForest Sale',
        time : '1st September 2027'
    },
]