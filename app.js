require('dotenv').config()
var dashboard = require('./dashboard');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
var jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
router.use((request, response, next) => {
  console.log('middleware');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Authorization');
  next();
});

router.route('/insert/kurs-rate').post((request, response) => {
 
  let token = request.headers.authorization 
  let tkode = request?.body?.tkode
  let beli = request?.body?.ld_beli
  let jual = request?.body?.ld_jual
  let tgl = request?.body?.tgl 
  
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
 
   dashboard.insertMsRate(tkode,beli,jual,tgl ).then((data) => {
    response.json({status:'Succsess',message:'Succsess fetch data',data});
  })
  } catch(err) {
    
    
    if(err?.name==='TokenExpiredError'){
      
      response.status(401).json({ error: 'Unauthorized',message:'Your session expired' });
    }else{
      
      response.status(500).json({ error: 'Server Error',message:'Invalid token' });
      
    }

  }
})

router.route('/update/kurs-rate').post((request, response) => {
 
  let token = request.headers.authorization 
  let tkode = request?.body?.tkode
  let beli = request?.body?.ld_beli
  let jual = request?.body?.ld_jual
  let tgl = request?.body?.tgl 
  
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
 
   dashboard.updateMsRate(tkode,beli,jual,tgl ).then((data) => {
    response.json({status:'Succsess',message:'Succsess fetch data',data});
  })
  } catch(err) {
    
    
    if(err?.name==='TokenExpiredError'){
      
      response.status(401).json({ error: 'Unauthorized',message:'Your session expired' });
    }else{
      
      response.status(500).json({ error: 'Server Error',message:'Invalid token' });
      
    }

  }
})

router.route('/delete/kurs-rate').post((request, response) => {
 
  let token = request.headers.authorization 
  let tkode = request?.body?.tkode 
  let tgl = request?.body?.tgl 
  
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
 
   dashboard.deletetMsRate(tkode, tgl ).then((data) => {
    response.json({status:'Succsess',message:'Succsess fetch data',data});
  })
  } catch(err) {
    
    
    if(err?.name==='TokenExpiredError'){
      
      response.status(401).json({ error: 'Unauthorized',message:'Your session expired' });
    }else{
      
      response.status(500).json({ error: 'Server Error',message:'Invalid token' });
      
    }

  }
})
router.route('/update/jaws').post((request, response) => {
 
  let token = request.headers.authorization  
  let userId = request?.body?.userId
  let jual = request?.body?.jual
  let tgl = request?.body?.tgl 
  
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
 
   dashboard.updateJaws( jual,tgl,userId ).then((data) => {
    response.json({status:'Succsess',message:'Succsess fetch data',data});
  })
  } catch(err) {
    
    
    if(err?.name==='TokenExpiredError'){
      
      response.status(401).json({ error: 'Unauthorized',message:'Your session expired' });
    }else{
      
      response.status(500).json({ error: 'Server Error',message:'Invalid token' });
      
    }

  }
})
var  port = process.env.PORT || 8094;
app.listen(port);
console.log('Order API is runnning at ' + port);