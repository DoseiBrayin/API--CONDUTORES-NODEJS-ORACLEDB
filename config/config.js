const { autoCommit } = require('oracledb');
const oracledb = require('oracledb');

db = {
    user: "proyecto", 
    password: "1234", 
    connectionString: "localhost/xe"
}

async function open(sql,binds,autoCommit){
    let connection = await oracledb.getConnection(db);
    let res = await connection.execute(sql,binds,{autoCommit});
    connection.release();
    return res;
}

exports.open = open;
