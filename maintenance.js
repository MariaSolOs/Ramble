const CompanyReceipt = require('./models/companyReceipt');

module.exports = async () => {
    console.log('Running maintenance script...');

    const receipts = await CompanyReceipt.find({});
    for (const receipt of receipts) {
        receipt.serviceFee = 0;
        await receipt.save();
    }

    console.log('Maintenance done!');
}