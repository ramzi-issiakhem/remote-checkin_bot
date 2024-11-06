
module.exports = (sequelize,DataTypes) => {
    return sequelize.define('employees', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        company: DataTypes.STRING
    }, {
        timestamps: true
    });
}