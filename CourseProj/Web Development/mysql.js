var mysql = require("mysql");
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql123456',
    database: 'WebCrawl',
});
/** 两种不同的调用mysql的方式 */
var query = function(sql, sqlparam, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            // conn.release();
            callback(err, null, null);
        } else {
            conn.query(sql, sqlparam, function(qerr, vals, fields) {
                // conn.release(); //释放连接
                callback(qerr, vals, fields); //事件驱动回调 
            });
        }
        pool.releaseConnection(conn)
    });
};
var query_noparam = function(sql, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            // conn.release();
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, vals, fields) {
                // conn.release(); //释放连接
                callback(qerr, vals, fields); //事件驱动回调 
            });
        }
        pool.releaseConnection(conn)
    });
};
exports.query = query;
exports.query_noparam = query_noparam;