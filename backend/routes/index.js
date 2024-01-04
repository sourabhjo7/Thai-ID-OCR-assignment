const express =require("express");
const CreateOcrRecord = require("../controllers/CreateOcrRecord");
const EditOcrRecord = require("../controllers/EditOcrRecord");
const SoftDelete = require("../controllers/SoftDelete");
const AllOcrRecords = require("../controllers/AllOcrRecords");
const router = express.Router();

// requiring controllers 

// route for getting all records except the soft deleted ones Method: GET
router.get("/",AllOcrRecords);
// route for soft Deleting the record  Method: GET
router.get("/delete/:id",SoftDelete);


// route for processing the ocr(extraction and formation) text and creating record in the database Method: POST
router.post("/Create",CreateOcrRecord);
// route for updating the record in the database Method: POST
router.post("/edit/:id",EditOcrRecord);


module.exports=router;

/*บัตรประจำตัวประชาชน Thai National ID Card
1 1037 02071 81 1
เลขประจำตัวประชาชน
Identification Number
ชื่อตัวและชื่อสกุล น.ส. ณัฐริกา ยางสวย
1
Name Miss Nattarika
Last name Yangsuai
เกิดวันที่ 25 มิ.ย. 2539
Date of Birth 25 Jun. 1996
ศาสนา พุทธ
ที่อยู่ 111/17 หมู่ที่ 2 ต.ลาดหญ้า อ.เมืองกาญจนบุรี
จ.กาญจนบุรี
24 ก.ค. 2553 -
วันออกบัตร
24 Jul, 2020
Date of Issue
from
(นายธนาคม จงจิระ
เจ้าพนักงานออกบัตร
in
24 มิ.ย. 2572
วันบัตรหมดอายุ
24 Jun. 2029
Date of Expiry
160
15
_160
150
40
1398-09-07241719 */