var configPalace = require('./dbpalace');
 
const  sql = require('mssql');
const { json } = require('body-parser');
var  moment = require('moment');
async function insertMsRate(tkode,beli,jual,tgl ) {
    
    try{
      
        let pool = await sql.connect(configPalace);
        let insertData =  await pool.request().query(`INSERT INTO msrate (m_kode, m_tanggal, m_beli, m_jual) values ('${tkode}', '${tgl}', '${beli}', '${jual}')`);  
        return  {tkode,beli,jual,tgl}
    }catch(error){
        console.log({error})
    }
}  
async function updateMsRate(tkode,beli,jual,tgl ) {
    
    try{
      
        let pool = await sql.connect(configPalace);
        let insertData =  await pool.request().query(`UPDATE msrate
        set m_beli = '${beli}',m_jual = '${jual}'
        WHERE m_kode = '${tkode}' and m_tanggal = '${tgl}'
        `); 
        return  {tkode,beli,jual,tgl}
    }catch(error){
        console.log({error})
    }
}  
async function deletetMsRate(tkode, tgl ) {
    
    try{
      
        let pool = await sql.connect(configPalace);
        let data =  await pool.request().query(`DELETE FROM msrate
        WHERE m_kode = '${tkode}' and m_tanggal = '${tgl}'
        `); 
        return  {tkode, tgl}
    }catch(error){
        console.log({error})
    }
}  
async function updateJaws(jual,tgl,userId ) {
    
    try{
      
        let pool = await sql.connect(configPalace);
        let ceklama = await pool.request().query(`select harga from pricingtableus where ID = 4 `); 
        let uslama = ceklama.recordsets[0][0]?.harga
        if ( uslama == '' ) {uslama = 0 ;} 
        let tsqljaws = await pool.request().query(`update pricingtableus set harga = "${jual}", OperatorTgl = Getdate() where ID = 4`);
		let tsqljaws2 = await pool.request().query(`insert into mondial_db_real.dbo.pricinglogus ( IDMaster, Tgl, Approval, HargaLama, HargaBaru ) 
        values ( 4, ${tgl}, '${userId}', "${uslama}", "${jual}")`);
        return  {userId,jual,tgl}
    }catch(error){
        console.log({error})
    }
}  
module.exports = {
    deletetMsRate,
    updateMsRate,
    insertMsRate,
    updateJaws 
}