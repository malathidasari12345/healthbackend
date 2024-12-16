const Image = require('../models/gallery');

const saveImage = async (req, res) => {
  try {
    const { public_id, secure_url } = req.body;
    console.log(public_id)
    console.log(secure_url)
    if (!public_id || !secure_url) {
      return res.status(400).json({ message: 'public_id and secure_url are required' });
    }

    const newImage = new Image({ public_id, secure_url });
    await newImage.save();

    res.status(201).json({ message: 'Image saved successfully', image: newImage });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Fetch all images
const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Fetch a single image by ID
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json(image);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Update image details
const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { public_id, secure_url } = req.body;

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { public_id, secure_url },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image updated successfully', image: updatedImage });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  saveImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage,
};
