module.exports = (mongoose) => {
  const Contact = mongoose.model(
    'contacts',
    mongoose.Schema(
      {
        contact_id: String,
        firstName: String,
        lastName: String,
        email: String,
        favoriteColor: String,
        birthday: Date,  
      },
      { timestamps: true }
    )
  );

  return Contact;
};
