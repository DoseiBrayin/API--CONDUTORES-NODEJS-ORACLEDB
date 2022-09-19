const { Router } = require('express');
const res = require('express/lib/response');
const router = Router();
const BD = require("../config/config")


//LEER
router.get('/api/consulta', async (req, res) => {
    const drivers = []
    sql ='SELECT d.name,d.last_name,transport_code,weight,address,estimade_date_of_delivery,package_registration_date,c.name_city as Origen,k.name_city as Destino,driver_identification FROM packages inner join drivers d on d.identification = packages.driver_identification inner join cities c on c.id_city = packages.origin_city inner join cities k on packages.destiny_city = k.id_city order by packages.transport_code'
    let result = await BD.open(sql, [], false);
    //console.log(result.rows);
    console.log(drivers);

    result.rows.map(driver => {
        let userSchema = {
            "NAME": driver[0],
            "LAST_NAME": driver[1],
            "TRANSPORT_CODE": driver[2],
            "WEIGTH": driver[3],
            "ADDRESS": driver[4],
            "ESTIMADE_DATE_OF_DELIVERY": driver[5],
            "PACKAGE_REGISTRATION_DATE": driver[6],
            "ORIGEN": driver[7],
            "DESTINO": driver[8],
            "DRIVER_IDENTIFICATION": driver[9]
        }
        drivers.push(userSchema);
    });

    res.json({ drivers });
    
});

//CREAR
router.post('/api/crear', async (req, res) => {
    
    const {
        TRANSPORT_CODE,
        WEIGTH,
        ADDRESS,
        ESTIMADE_DATE_OF_DELIVERY,
        PACKAGE_REGISTRATION_DATE,
        ORIGEN,
        DESTINO,
        DRIVER_IDENTIFICATION } = req.body;

    sql = "insert into packages(TRANSPORT_CODE,WEIGHT,ADDRESS,ESTIMADE_DATE_OF_DELIVERY,PACKAGE_REGISTRATION_DATE,ORIGIN_CITY,DESTINY_CITY,DRIVER_IDENTIFICATION) values (:TRANSPORT_CODE,:WEIGTH,:ADDRESS,TO_DATE(:ESTIMADE_DATE_OF_DELIVERY,'YYYY-MM-DD'),TO_DATE(:PACKAGE_REGISTRATION_DATE,'YYYY-MM-DD'),:ORIGEN,:DESTINO,:DRIVER_IDENTIFICATION)";
    await BD.open(sql, [TRANSPORT_CODE, WEIGTH, ADDRESS, ESTIMADE_DATE_OF_DELIVERY, PACKAGE_REGISTRATION_DATE, ORIGEN, DESTINO, DRIVER_IDENTIFICATION], true);
    
    const drivers = []
    sql2 ='SELECT d.name,d.last_name,transport_code,weight,address,estimade_date_of_delivery,package_registration_date,c.name_city as Origen,k.name_city as Destino,driver_identification FROM packages inner join drivers d on d.identification = packages.driver_identification inner join cities c on c.id_city = packages.origin_city inner join cities k on packages.destiny_city = k.id_city order by packages.transport_code'
    let result = await BD.open(sql2, [], false);

    result.rows.map(driver => {
        let userSchema = {
            "NAME": driver[0],
            "LAST_NAME": driver[1],
            "TRANSPORT_CODE": driver[2],
            "WEIGTH": driver[3],
            "ADDRESS": driver[4],
            "ESTIMADE_DATE_OF_DELIVERY": driver[5],
            "PACKAGE_REGISTRATION_DATE": driver[6],
            "ORIGEN": driver[7],
            "DESTINO": driver[8],
            "DRIVER_IDENTIFICATION": driver[9]
        }
        drivers.push(userSchema);
    });
    res.json({ drivers });
})

//ACTUALIZAR

router.put("/api/editar", async (req, res) => {
    const {
        TRANSPORT_CODE,
        WEIGTH,
        ADDRESS,
        ORIGEN,
        DESTINO,
        DRIVER_IDENTIFICATION } = req.body;

    sql = "BEGIN ACTUALIZAR(:TRANSPORT_CODE,:WEIGTH,:ADDRESS,:ORIGEN,:DESTINO,:DRIVER_IDENTIFICATION ); END;";
    //BEGIN ACTUALIZAR(:TRANSPORT_CODE,:WEIGTH,:ADDRESS,:ORIGEN,:DESTINO,:DRIVER_IDENTIFICATION ); END;
    //UPDATE PACKAGES SET WEIGHT=:WEIGTH,ADDRESS=:ADDRESS,ORIGIN_CITY=:ORIGEN,DESTINY_CITY=:DESTINO,DRIVER_IDENTIFICATION=:DRIVER_IDENTIFICATION WHERE TRANSPORT_CODE=:TRANSPORT_CODE

    await BD.open(sql, [WEIGTH, ADDRESS,ORIGEN, DESTINO, DRIVER_IDENTIFICATION, TRANSPORT_CODE], true);

    const drivers = []
    sql2 ='SELECT d.name,d.last_name,transport_code,weight,address,estimade_date_of_delivery,package_registration_date,c.name_city as Origen,k.name_city as Destino,driver_identification FROM packages inner join drivers d on d.identification = packages.driver_identification inner join cities c on c.id_city = packages.origin_city inner join cities k on packages.destiny_city = k.id_city order by packages.transport_code'
    let result = await BD.open(sql2, [], false);

    result.rows.map(driver => {
        let userSchema = {
            "NAME": driver[0],
            "LAST_NAME": driver[1],
            "TRANSPORT_CODE": driver[2],
            "WEIGTH": driver[3],
            "ADDRESS": driver[4],
            "ESTIMADE_DATE_OF_DELIVERY": driver[5],
            "PACKAGE_REGISTRATION_DATE": driver[6],
            "ORIGEN": driver[7],
            "DESTINO": driver[8],
            "DRIVER_IDENTIFICATION": driver[9]
        }
        drivers.push(userSchema);
    });

    res.json({ drivers });

})

//ELIMINAR

router.delete('/api/borrar/:TRANSPORT_CODE', async (req, res) => {
    const { TRANSPORT_CODE } = req.params;

    sql = "BEGIN BORRAR(:TRANSPORT_CODE); END;"

    await BD.open(sql, [TRANSPORT_CODE], true);

    const drivers = []
    sql2 ='SELECT d.name,d.last_name,transport_code,weight,address,estimade_date_of_delivery,package_registration_date,c.name_city as Origen,k.name_city as Destino,driver_identification FROM packages inner join drivers d on d.identification = packages.driver_identification inner join cities c on c.id_city = packages.origin_city inner join cities k on packages.destiny_city = k.id_city order by packages.transport_code'
    let result = await BD.open(sql2, [], false);

    result.rows.map(driver => {
        let userSchema = {
            "NAME": driver[0],
            "LAST_NAME": driver[1],
            "TRANSPORT_CODE": driver[2],
            "WEIGTH": driver[3],
            "ADDRESS": driver[4],
            "ESTIMADE_DATE_OF_DELIVERY": driver[5],
            "PACKAGE_REGISTRATION_DATE": driver[6],
            "ORIGEN": driver[7],
            "DESTINO": driver[8],
            "DRIVER_IDENTIFICATION": driver[9]
        }
        drivers.push(userSchema);
    });

    res.json({ drivers });
})













module.exports = router;