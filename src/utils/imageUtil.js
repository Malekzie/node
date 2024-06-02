const getRandomImage = (element) => {
     const imageCount = 3; // Adjust this based on the number of images you have per element
     const randomIndex = Math.floor(Math.random() * imageCount) + 1;
     return `/img/spellbook/${element.toLowerCase()}${randomIndex}`;
 };
 
 module.exports = { getRandomImage };