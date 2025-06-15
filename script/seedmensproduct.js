const Perfume = require('../models/mensperfume');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const perfumes = [
    {
        title: "VersaceEros",
        image: "https://imgs.search.brave.com/2p2Jcj56EijasuIJPEtj4F3HnDsxQZTW9hUd7T33cjg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJhZ3JhbmNleC5j/b20vaW1hZ2VzL3By/b2R1Y3RzL3NrdS9s/YXJnZS92ZXJlcnRz/bS5qcGc",
        description: "A popular men's fragrance noted for its fresh and woody scent, with notes of citrus, mint, and cedarwood, packaged in a bold blue bottle."
    },
    {
        title: "Diptyque Orphéon",
        image: "https://imgs.search.brave.com/Q78UVcT1NKFpcEzRr3TMq6vPLw-MMSEfeOGICMtwKb8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bW9uYzEzLmNvbS9j/ZG4vc2hvcC9maWxl/cy9vcnBoZW9uX2Zh/Y2UuanBnP2Nyb3A9/Y2VudGVyJmhlaWdo/dD01MDAmdj0xNzMx/MDg2NTQwJndpZHRo/PTM3NQ",
        description: " A modern fragrance inspired by Paris in the early '60s, featuring tonka bean, smoke, cedar, and jasmine notes."
    },
    {
        title: "Frederic Malle Vetiver Extraordinaire",
        image: "https://imgs.search.brave.com/TH65-_N0isyDRSS2GQEub9LlOn7lnUVZ5Y0t6rRxM5U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ha3Jp/a2tzLmNvbS9jZG4v/c2hvcC9wcm9kdWN0/cy9mcmVkZXJpY21h/bGxlX2RvbWluaXF1/ZV9yb3Bpb25fdmV0/aXZlcl9leHRyb3Jk/aW5haXJlX0g0RzMw/MV85OTE3NjAwMjVf/ZnJvbnQucG5nP3Y9/MTYzMjE1NzYyNyZ3/aWR0aD0xOTIw",
        description: "Crafted in collaboration with French perfumer Dominique Ropion, it features mint, aniseed, geranium, sandalwood, and frankincense notes."
    },
    {
        title: "Dior Sauvage Elixir",
        image: "https://imgs.search.brave.com/_9M-fV7nL3LEG2xkjMI_4SGr8ssmAMm9vYxOupOIOY8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly92aXNp/b25hcnlmcmFncmFu/Y2VzLmNvbS9jZG4v/c2hvcC9maWxlcy8z/RjBBMjg0OF81MzB4/QDJ4LmpwZz92PTE3/MzQ2OTE4NzM",
        description: "A designer cologne with warm and slightly sweet, spicy fragrance notes, ideal for formal occasions."
    },
    {
        title: "CEO Man",
        image: "https://imgs.search.brave.com/EY0_fNh8_WX3YbQRZ3ATtx0JMq6vdd3QYxZ1MXU4UDE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzQxNi80MTYveGlm/MHEvcGVyZnVtZS91/L24vdy8xMDAtY2Vv/LW1hbi1lYXUtZGUt/cGFyZnVtLWZvci1t/ZW4tbG9uZy1sYXN0/aW5nLW5vdGVzLW9m/LXRvbmthLW9yaWdp/bmFsLWltYWd6NHh6/a3lhbXd2YmMuanBl/Zz9xPTcw",
        description: " A best-selling perfume with high customer ratings, available in various sizes and noted for its long-lasting fragrance."
    },
    {
        title: "Azzaro The Most Wanted Eau de Parfum",
        image: "https://imgs.search.brave.com/UNPxdJjiDnB3qbIW-_UwqVGe4i7KUfBeSW69RowCQ-w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bm90aW5vaW1nLmNv/bS9kZXRhaWxfbWFp/bl9scS9henphcm8v/MzYxNDI3MzUyMTMw/N18wMy90aGUtbW9z/dC13YW50ZWQtaW50/ZW5zZV9fXzI1MDUx/NS5qcGc",
        description: "Recognized as the best overall cologne, offering a balanced blend of woody, spicy, fresh, and citrus notes."
    },
    {
        title: "Tom Ford Tobacco Vanille",
        image: "https://imgs.search.brave.com/wZQrmKQxB05XA8kHuJ02GCkG7sgS4Hi-RiKqrrwxMNM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibHVl/Z3Jhc3NmcmFncmFu/Y2UuY29tL2Nkbi9z/aG9wL2ZpbGVzLzVf/MGZmZTg4ZTgtN2Mx/YS00MjlmLThiMDAt/YmM4YjcwYjU5OTgz/LnBuZz92PTE3Mjcz/NTYzMjImd2lkdGg9/MTQ0NQ",
        description: "A vanilla-based cologne with a decadent dessert-like scent profile, complemented by notes of ginger, cardamom, and vanilla."
    },
    {
        title: "Aesop’s Hwyl",
        image: "https://imgs.search.brave.com/k6u-CiGmrMPAwICFyJxzezCRXAe5sdc_RXJofrRIcJQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWNvc21ldGljcy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjIvMDcvQWVzb3At/SHd5bC1FYXUtRGUt/UGFyZnVtLVNwcmF5/LTEuNm96LTkzMTk5/NDQwMTIxNDkuanBn",
        description: "Offers a fresh and earthy scent reminiscent of a forest after rain, with notes of thyme, elemi, pink pepper, and cedar."
    },
    {
        title: "Creed Aventus",
        image: "https://imgs.search.brave.com/u3OTUhm3o0DtDtk2qFfEk5m2vcgLm1yi5uvciBdC_Og/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2M2L2Fm/LzgwL2M2YWY4MDJh/NWY3OWMzM2JiN2Y5/OGNlMTliY2FiNTZi/LmpwZw",
        description: "Known for its crisp top notes of apple, blackcurrant, pineapple, and bergamot, followed by heart and base notes like birch, patchouli, vanilla, and musk, symbolizing strength and success."
    },
    {
        title: "Chanel Bleu de Chanel",
        image: "https://imgs.search.brave.com/XwHJnTTBh47dNP0oDDqZzdtAAvYIeacbNMKtEvTBGBE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxvb21pbmdk/YWxlc2Fzc2V0cy5j/b20vaXMvaW1hZ2Uv/QkxNL3Byb2R1Y3Rz/LzUvb3B0aW1pemVk/LzEyOTY4NzM1X2Zw/eC50aWY_JDIwMTRf/QlJPV1NFX0ZBU0hJ/T04kJnFsdD04MCww/JnJlc01vZGU9c2hh/cnAyJm9wX3VzbT0x/Ljc1LDAuMywyLDAm/Zm10PWpwZWcmd2lk/PTM0MiZoZWk9NDI4",
        description: "Features fresh, clean, and sensual notes of citrus, labdanum, sandalwood, and cedar, easily transitioning from day to night"
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

