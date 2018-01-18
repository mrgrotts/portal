const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema(
  {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    text: {
      type: String,
      required: 'Comments cannot be blank'
    }
  },
  {
    timestamps: true
  }
);

const ticketsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    status: {
      type: String,
      required: 'Please select a status',
      lowercase: true,
      trim: true,
      default: 'unassigned',
      enum: [
        'unassigned',
        'prep',
        'onhold',
        'inprogress',
        'pending',
        'purchasingparts',
        'orderedparts',
        'closed'
      ]
    },
    category: {
      type: String,
      required: 'Please select a category',
      // lowercase: true,
      // trim: true,
      default: 'Commercial Cleaning',
      enum: [
        'Commercial Cleaning',
        'Residential Cleaning',
        'Drywall Installation',
        'Electrician',
        'Floor Services',
        'Maintenance',
        'Painter',
        'Pest Control',
        'Plumber',
        'Post Construction',
        'Window Washing'
      ]
    },
    location: {
      type: String,
      required: 'Location cannot be blank'
    },
    description: {
      type: String,
      required: 'Description cannot be blank'
    },
    media: {
      // with google cloud storage
      file: String,
      name: String,
      url: String
    },
    comments: {
      child: commentsSchema,
      children: [commentsSchema]
    },
    assignedTo: {
      type: String
    },
    requestedDate: {
      type: String,
      required: 'Please request a service date'
    },
    scheduledFor: {
      type: Date
    },
    partPurchasedDate: {
      type: Date
    },
    partArrivedDate: {
      type: Date
    },
    workCompleted: {
      type: String
    },
    hoursSpent: {
      type: Number
    },
    hourlyRate: {
      type: Number
    },
    completedDate: {
      type: Date
    },
    requestedDeletion: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// class TicketsClass {
//   // methods for schema go here
//   // http://mongoosejs.com/docs/advanced_schemas.html
// }

// ticketsSchema.loadClass(TicketsClass);
const Tickets = mongoose.model('Tickets', ticketsSchema);

module.exports = Tickets;

/* 
// media path 
let mediaPath = '../public/assets';
const mediaSchema = new mongoose.Schema({
  asset: {
    type: Buffer,
    contentType: String
  }
});
*/
/* 
// store media in binary in mongo 
let media = new mediaSchema();
media.asset.type = fs.readFileSync(mediaPath);
media.asset.contentType = 'image/png';
media.save(function(err, media) {
  if (err) throw err;

  console.error('saved media to mongo');
  // example route
  app.get('/', function(req, res, next) {
    mediaSchema.findById(media, function(err, doc) {
      if (err) return next(err);
      res.contentType(doc.asset.contentType);
      res.send(doc.asset.type);
    });
  });
});
*/
