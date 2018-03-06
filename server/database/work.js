const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema(
  {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    text: {
      type: String,
      required: 'Message cannot be blank'
    }
  },
  {
    timestamps: true
  }
);

const workSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customers'
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      }
    ],
    status: {
      type: String,
      // required: 'Please select a status',
      // lowercase: true,
      // trim: true,
      default: 'Unassigned',
      enum: ['Unassigned', 'Prep', 'On Hold', 'In Progress', 'Pending', 'Purchasing Parts', 'Ordered Parts', 'Closed']
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Locations',
      required: 'Please select a Location'
    },
    description: {
      type: String,
      required: 'Description cannot be blank'
    },
    media: [
      {
        // with google cloud storage
        type: String
      }
    ],
    messages: {
      child: messagesSchema,
      children: [messagesSchema]
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

// class WorkClass {
//   // methods for schema go here
//   // http://mongoosejs.com/docs/advanced_schemas.html
// }

// workSchema.loadClass(WorkListClass);
const Work = mongoose.model('Work', workSchema);

module.exports = Work;

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
