const QuickBooks = require("node-quickbooks");

const consumerKey = "Q0aIuU5BcaRH2vuDGblRpRm2dGNprV1g2407AqoFSgFk25yqnd";
const consumerSecret = "VfCISeBd60Edv9kSKQtVGr8Mmpse9JI6moA7RhUp";

QuickBooks.setOauthVersion("2.0");

// OAUTH 2 makes use of redirect requests
let generateAntiForgery = session => {
  let secret = csrf.secretSync();
  return csrf.create(secret);
};

exports.buildInvoice = (invoiceData, callback) => {
  var invoice = {
    Deposit: 0,
    domain: "QBO",
    sparse: false,
    MetaData: {
      CreateTime: "2017-09-19T13:16:17-07:00", //use moment
      LastUpdatedTime: "2017-09-19T13:16:17-07:00"
    },
    TxnDate: "2018-09-19",
    Line: [],
    TxnTaxDetail: {
      TxnTaxCodeRef: {
        value: "2"
      },
      TotalTax: 26.82,
      TaxLine: [{}]
    },
    CustomerRef: {
      value: invoiceData.companyId
    },
    CustomerMemo: {
      value: "Thank you for your business and have a great day!"
    },
    DueDate: "2018-10-20",
    TotalAmt: 362.07,
    ApplyTaxAfterDiscount: false,
    PrintStatus: "NeedToPrint",
    EmailStatus: "NotSet",
    BillEmail: {
      Address: invoiceData.user
    },
    Balance: 362.07
  };

  var notes = invoiceData.notes;
  var i = 0;

  while (notes.indexOf("\n") > -1) {
    var val;
    switch (notes.substring(0, notes.indexOf(":"))) {
      case "PURCHASED":
        val = 121;
        break;
      case "REPLACED":
        val = 122;
        break;
      case "REPAIRED":
        val = 123;
        break;
      case "REMOVED":
        val = 124;
        break;
      case "INSPECTED":
        val = 125;
        break;
    }

    invoice.Line.push({
      Id: i,
      LineNum: i,
      Description: notes
        .substring(notes.indexOf(":") + 1, notes.indexOf("\n"))
        .trim(),
      Amount: 1.0,
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        ItemRef: {
          value: val,
          name: notes.substring(0, notes.indexOf(":"))
        },
        UnitPrice: 1.0,
        Qty: 1,
        TaxCodeRef: {
          value: "TAX"
        }
      }
    });
    i++;
    notes = notes.substring(notes.indexOf("\n") + 1);
  }

  invoice.Line.push({
    Id: i,
    LineNum: i,
    Description: "",
    Amount: invoiceData.hourlyrate * invoiceData.hoursspent,
    DetailType: "SalesItemLineDetail",
    SalesItemLineDetail: {
      ItemRef: {
        value: 127,
        name: "Total Cost"
      },
      UnitPrice: invoiceData.hourlyrate,
      Qty: invoiceData.hoursspent,
      TaxCodeRef: {
        value: "TAX"
      }
    }
  });

  invoice.Line.push({
    Amount: 1.0,
    DetailType: "SubTotalLineDetail",
    SubTotalLineDetail: {}
  });

  callback(invoice);
};

exports.readInvoices = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.deleteInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

/*

app.post('/requestqbtoken', (req, res) => {
  var redirecturl =
    QuickBooks.AUTHORIZATION_URL +
    '?client_id=' +
    consumerKey +
    '&redirect_uri=' +
    encodeURIComponent('https://app.rozaladocleaning.com' + '/qbtokencallback/') + //Make sure this path matches entry in application dashboard
    '&scope=com.intuit.quickbooks.accounting' +
    '&response_type=code' +
    '&state=' +
    generateAntiForgery(req.session); //do we need this?

    res.send(redirecturl);
});

app.get('/qbtokencallback', function(req, res) {
  var auth = new Buffer(consumerKey + ':' + consumerSecret).toString('base64');

  var postBody = {
    url: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + auth
    },
    form: {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'https://app.rozaladocleaning.com' + '/qbtokencallback/' //Make sure this path matches entry in application dashboard
    }
  };

    request.post(postBody, (e, r, data) => {
        var accessToken = JSON.parse(r.body);

        // save the access token somewhere on behalf of the logged in user
        var qbo = new QuickBooks(consumerKey, consumerSecret, accessToken.access_token, false, req.query.realmId, false, true, 4, '2.0', accessToken.refresh_token);

        constructInvoice(invoiceData, (data) => {
            qbo.createInvoice(data, (error, response) => {
            });
        });
    });
});
*/
