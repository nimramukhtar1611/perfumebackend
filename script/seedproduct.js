const Perfume = require('../models/perfume');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const perfumes = [
    {
        title: "Ocean Breeze",
        image: "https://imgs.search.brave.com/KCrxZDqqKedHGAhZqOVCFssmjpHYmGokzgjG3aLOqXo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vYXF1YWNp/ZWxlZXRlcnJlLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8xMC9vcmlnaW5h/bC02NC5qcGVnP2Zp/dD04MDAsODAwJnNz/bD0x",
        description: "A fresh and aquatic fragrance that reminds you of a sea breeze."
    },
    {
        title: "Amber white",
        image: "https://imgs.search.brave.com/FubF7HefQWHgsSiFvx96K5OxZ3aJ5lp9UsjldePzc2o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzE1ODE0NjA4L2Mv/MTkwNy8xOTA3LzQ4/LzgyL2lsLzhiZDA4/YS81OTc0NzUxNDE3/L2lsXzMwMHgzMDAu/NTk3NDc1MTQxN184/czE3LmpwZw",
        description: "A warm, spicy, and mysterious scent perfect for evening wear."
    },
    {
        title: "Citrus Bloom",
        image: "https://imgs.search.brave.com/u8kFvIvbSFjZCSKnRBQ1lC7Uu5q9mZrahNO6I_jK3lw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjEtS2pDc09PNUwu/anBn",
        description: "A bright and energetic fragrance with notes of lemon and orange blossom."
    },
    {
        title: "Velvet Rose",
        image: "https://imgs.search.brave.com/FW1eYLoWmvKhCUCfRs3SHU3jm4JrKRixx2Fd1n4fjpI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9maW1n/cy5uZXQvbWRpbWcv/cGVyZnVtZS8zNzV4/NTAwLjc2ODY3Lmpw/Zw",
        description: "A luxurious and floral fragrance with a touch of sweetness."
    },
    {
        title: "Woodland Whisper",
        image: "https://imgs.search.brave.com/BqY2vqzmpYOLm17b3hYRJwmVbyajbDkdnkfa6WoRino/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzE4Njc4NTI4L3Iv/aWwvYzhhMmEzLzUw/MjA3NDAxNTUvaWxf/NjAweDYwMC41MDIw/NzQwMTU1X2ZvbXAu/anBn",
        description: "An earthy and woody scent inspired by forest adventures."
    },
    {
        title: "Midnight Musk",
        image: "https://imgs.search.brave.com/AgwD1ACcrlNddvnhR89pg2TVsNMzSA2z4NSNQBEo6XA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9maW1n/cy5uZXQvbWRpbWcv/cGVyZnVtZS8zNzV4/NTAwLjI2NTU2Lmpw/Zw",
        description: "A deep and sensual musk fragrance with a hint of vanilla."
    },
    {
        title: "Tropical Twist",
        image: "https://imgs.search.brave.com/0GsYJmAEOzd7r3rVGN0QjTgjCnU9RM7-fMsmlvFWXUM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzQyMTIxNTY3L3Iv/aWwvMzc0NWUyLzY1/ODU0Mjg1OTkvaWxf/MzQweDI3MC42NTg1/NDI4NTk5X3FmdnYu/anBn",
        description: "An exotic blend of tropical fruits and flowers that transports you to paradise."
    },
    {
        title: "Lavender rain",
        image: "https://imgs.search.brave.com/k5bIGAF9YfKWLa1ADs46LotdrjLd1pzEFR6zkx4Esco/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXNha2ZyYWdyYW5j/ZXMuY29tL2Nkbi9z/aG9wL2ZpbGVzLzM4/LnBuZz92PTE3MDAx/NTQyMTUmd2lkdGg9/MTA4MA",
        description: "A calming lavender scent that soothes and relaxes the senses."
    },
    {
        title: "Spice Route",
        image: "https://imgs.search.brave.com/WdQyjBx0VHudjW5quqyj_QYhylI1DVvaQQvEVbpuI6s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sYXN1/bHRhbmVkZXNhYmF1/c2EuY29tL2Nkbi9z/aG9wL3Byb2R1Y3Rz/L2VwaWNlcGVyZnVt/ZTEwMDB4MTUwMF84/MDB4MTAyNl9jcm9w/X2NlbnRlci5wbmc_/dj0xNjQ2OTQzNTc0",
        description: "An adventurous mix of spices and herbs for the bold and daring."
    },
    {
        title: "Golden Oud",
        image: "https://imgs.search.brave.com/72DodPvp9GcIoyG2XHs3licqajMgTy4LMuRq2knhMJg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2Vic2hvcGFwcC5j/b20vc2hvcHMvMjk0/NzEvZmlsZXMvMzU1/NDg1NjMxLzY1MHg2/NTB4Mi9nb2xkZW4t/b3VkLWFzZGFmLWVh/dS1kZS1wYXJmdW0t/MTAwbWwtYnktbGF0/dGFmYS1wZS5qcGc",
        description: "A rich and luxurious oud fragrance with golden undertones."
    }
];

const seedPerfume = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        await Perfume.deleteMany(); 
        await Perfume.insertMany(perfumes); 
        console.log("Products added successfully!");
        process.exit();
    } catch (error) {
        console.log("Error occurred:", error);
        process.exit(1);
    }
};

seedPerfume();

