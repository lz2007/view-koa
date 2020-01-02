const mysql = require('mysql');

const config = {
    // 启动端口
    port: 3000,

    // 数据库配置
    database: {
        DATABASE: 'products', // 使用哪个数据库
        USERNAME: 'root', // 用户名
        PASSWORD: 'root', // 口令
        HOST: 'localhost', // 主机名
        PORT: 3306 // 端口号，MySQL默认3306
    }
}



const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});


function query(sql) {
    return new Promise((resolve, reject) => {

        pool.getConnection(function (error, connection) {
            connection.query(sql, function (error, results) {
                if (error) {
                    throw error;
                } else {
                    connection.release();
                    resolve(results)
                }
            });
            
        });
    });
}


//  pool.query('SELECT * from product', function (error, results, fields) {
//     console.log(results);
//  });

module.exports = query;