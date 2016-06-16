module.exports = function(sequelize, DataTypes) {
    var Test = sequelize.define("Test", {
        f1 : {
            type : DataTypes.STRING,
        },
        f2 : {
            type : DataTypes.STRING,
        },
        f3 : {
            type : DataTypes.STRING,
        },
    });

    return Test;
};