const Nominal = require('./model')

module.exports = {
  index: async(req,res)=>{
    try{
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }
      const nominal = await Nominal.find()

      res.render('admin/nominal/view_nominal',{
        nominal,
        alert,
        title: 'Nominal'
      })
    }catch(err){
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  viewCreate: async(req,res)=>{
    try {
      res.render('admin/nominal/create',{
        title: 'Create Nominal'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  actionCreate: async(req,res)=>{
    try {
      const {coinName, coinQuantity, price} = req.body;

      let nominal = await Nominal({coinName, coinQuantity, price})
      await nominal.save();

      req.flash('alertMessage', 'Create nominal successfully')
      req.flash('alertStatus', 'success')

      res.redirect('/nominal')
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  }
}