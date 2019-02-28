import * as express from 'express';
import { PriceController } from '../controllers/PriceController';

type Request = express.Request;
type Response = express.Response;

/*  Note:   This class is subject to later abstraction via passing
            {method, path, callee} vectors. Hence the warning 
            below.
*/
export default class {

    public router: express.Router;
    public priceController: PriceController = new PriceController();

    constructor() {
        this.router = express.Router();
        this.config();
    }


    private config(): void {
        this.router
            
            // get all prices
            .get('/', this.priceController.getPrice)
            
            // create a new price
            .post('/', this.priceController.addNewPrice)

            
    }
} 