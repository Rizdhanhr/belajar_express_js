function brandIndex(req,res){
    res.render('brand/index',{title : "Brand"});
}

module.exports = {
    brandIndex
}