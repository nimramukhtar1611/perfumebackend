const Perfume = require('../models/womensperfume');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const perfumes = [
    {
        title: "Clive Christian No. 1 Imperial Majesty",
        image: "https://imgs.search.brave.com/RbcuaT9LjFDDgaXCoDnz2LP6x7Bs0vwNrN2bXc6dhgQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y5Lzgx/LzZiL2Y5ODE2Yjc2/MTI5YmMxYmIxMmMy/NmUzZGM2OTMxNWYw/LmpwZw",
        description: "This exquisite fragrance is crafted with a rich blend of rare and luxurious ingredients, including Indian sandalwood, Tahitian vanilla, and ylang-ylang, creating a scent that embodies timeless elegance and sophistication. It is housed in a handcrafted crystal stopper and a 24-karat gold-plated neck, reflecting the pinnacle of opulence and artistry in perfumery."
    },
    {
        title: "Caron Poivre",
        image: "https://imgs.search.brave.com/Z0tMLH9CCHcoxK_VsGfOYa0RC72a9UR9ATjxQBOng7Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29zbWV0aWZ5LmNv/bS9pbWFnZXMvc3Vw/cGxlbWVudGFyeS9j/YXJvbi1wb2l2cmUt/aW1wZXJpYWwtZWF1/LWRlLXBhcmZ1bS0x/NzE1MTc2NjgyLWx4/a25qb3RnbWwtMjc5/NTgyLmpwZw",
        description: " A true masterpiece in the world of haute perfumery, this fragrance is housed in a stunning Baccarat crystal bottle. It features a harmonious blend of spicy and floral notes, including black and red pepper, cloves, and a rich heart of jasmine and rose, making it a coveted treasure for fragrance connoisseurs."
    },
    {
        title: "Baccarat Rouge 540",
        image: "https://imgs.search.brave.com/CfVdb9GLwQXp0XD-IFrK8Jfp1pIoXkQh1XB8T_a4pkM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJhbmNpc2t1cmtk/amlhbi5jb20vZHcv/aW1hZ2UvdjIvQkpT/Ql9QUkQvb24vZGVt/YW5kd2FyZS5zdGF0/aWMvLS9TaXRlcy1t/ZmstbWFzdGVyLWNh/dGFsb2cvZGVmYXVs/dC9kd2M1MjM0ZGNj/L1BhY2tzaG90cyUy/MDIwMjIvUm91Z2Ul/MjA1NDAvUEFDS1NI/T1RfUk9VR0VfNTQw/XzM1TUxfRVhUX1ZV/RTMtMy00X0ZPTkQt/VFJBTlNQQVJFTlRf/NDYweDQ2MC5wbmc_/c3c9NjQwJnNoPTY0/MCZzdHJpcD1mYWxz/ZQ",
        description: " A controversial luxurious fragrance with a precious blend of warm skin-like ambergris and exotic spicy-sweet saffron, complemented with bitter almond and deepened with woody undertones. It is described as a shimmering golden veil, offering an addictive and complex aroma."
    },
    {
        title: "Passion Nomad Perfume",
        image: "https://imgs.search.brave.com/ITL5R-bGM9UX4GhXwZcKtnZDSOQl4Y5a0LO6KyQuU70/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzFodnl1azJGeUwu/anBn",
        description: "created by the amalgamation of oud wood, benzoin tears, incense, and a hint of raspberry."
    },
    {
        title: "Frédéric Malle Portrait of a Lady",
        image: "https://imgs.search.brave.com/uOu6xs3xBDr-b3KSneOFoyrApnWwIVQ2tzMAAetDKWY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL2RkWUFB/ZVN3LU94bjhBRjcv/cy1sNTAwLmpwZw",
        description: " Praised for its elegant aroma profile, this perfume is noted as a top luxurious choice for women in 2024, embodying the craftsmanship of expert perfumers and the use of unique ingredients."
    },
    {
        title: "BELLAVITA Senorita",
        image: "https://imgs.search.brave.com/nGIGSRB1MFv6v00Qfr9zKWFpC4aY091_pYAmt8cfn6M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9BTkRST0lEL0Rl/ZmF1bHQvMjAyNC8x/MC80NTczNzk5MzEv/VFkvTEgvSlYvMTg5/NDg4Njc5L3Byb2R1/Y3QtanBlZy0xMDAw/eDEwMDAuanBn",
        description: " a line of fragrances and personal care products designed for women."
    },
    {
        title: "Byredo Mojave Ghost",
        image: "https://imgs.search.brave.com/NPcPCBZfwiyzRdNr-_QZuXFAGhx2SDoNecCJm8FTgzo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vQnly/ZWRvLVVuaXNleC1N/b2phdmUtR2hvc3Qt/RURQLVNwcmF5LTMt/NC1vei1GcmFncmFu/Y2VzLTczNDAwMzI4/NjA3NDBfMjc1MjQ3/YmUtN2RiMy00Njhk/LTgwNDEtYjZhMzRi/MGIyNjRmLmU5Yjc3/ZTY2NmIyNDcxZWQy/ODhmMjYwYzliMWY1/YzA5LmpwZWc_b2Ru/SGVpZ2h0PTU4MCZv/ZG5XaWR0aD01ODAm/b2RuQmc9RkZGRkZG",
        description: " Recommended for evening sophistication, this fragrance is part of the top luxurious choices for women in 2024, known for its unique scent profile and brand reputation."
    },
    {
        title: "Shumukh by Nabeel",
        image: "https://imgs.search.brave.com/DmNmU1w8yoIJZvF02xZnxDmZCFvGOuqV-W5it3L9nrw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZG90d25ld3MuY29t/L21vZHVsZXMvaW1h/Z2VfcmVzaXplL2lt/YWdlX3Jlc2l6ZS5w/aHA_aW1hZ2U9L3Vw/bG9hZHMvcG9zdHMv/MzUwMzkuanBnJndp/ZHRoPTg2MCZoZWln/aHQ9NDY4JmNyb3By/YXRpbz04NjA6NDY4",
        description: "Priced at $1.29 million for a bottle, this perfume is housed in a three-litre crystal bottle embellished with pure silver, 18-carat gold, and over 3,571 precious stones, making it the world's most opulent perfume."
    },
    {
        title: "Paco Rabanne 1 Million Luxe Edition",
        image: "https://imgs.search.brave.com/Dpfmwqev8VApzU6e4jbNL7xLNBAZd_bv5Ucp1B5oFxI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxOWhpQkhSVVpM/LmpwZw",
        description: "Priced at $57,000, this fragrance is encased in a golden case topped with a diamond crown. It features an enticing note that includes seductive blood orange, grapefruit, cinnamon, mint, rose, spices, light leather, white wood, patchouli, and amber."
    },
    {
        title: "Serge Lutens",
        image: "https://imgs.search.brave.com/DnVYMCbhBIdr5HpdQhfQDINBq_A5RrD-wH-f2shoCDc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzExMjY5ODAzL3Iv/aWwvMWI5YTM4LzYw/OTA5MTU1MDMvaWxf/MzAweDMwMC42MDkw/OTE1NTAzX3RoMncu/anBn",
        description: "Known for its exquisite and complex fragrances, this brand offers scents that are extremely idiosyncratic, providing a unique olfactory experience. Their fragrances are praised for their uniqueness and staying power."
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

