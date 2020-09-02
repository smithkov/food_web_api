"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("VirtualShops", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      shopName: {
        type: Sequelize.STRING,

      },
      logo: {
        type: Sequelize.STRING,
      },
      totalSale: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.STRING,
      },
      shopUrl: {
        type: Sequelize.STRING,
      },
      firstAddress: {
        type: Sequelize.STRING,
      },
      postCode: {
        type: Sequelize.STRING,
      },
      shopUrl: {
        type: Sequelize.STRING,
      },
      hasIdVerified: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      verificationCode: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      phoneVerifyCode: {
        type: Sequelize.STRING,
      },
      notice: {
        type: Sequelize.TEXT,
      },
      about: {
        type: Sequelize.TEXT,
      },
      hasEmailVerified: {
        type: Sequelize.BOOLEAN,
      },
      deliveryPrice: {
        type: Sequelize.STRING,
      },
      minOrder: {
        type: Sequelize.STRING,
      },
      maxTime: {
        type: Sequelize.STRING,
      },
      
      minTime: {
        type: Sequelize.STRING,
      },
      banner: {
        type: Sequelize.STRING,
      },
      percentageDiscount: {
        type: Sequelize.STRING,
      },
      discountAmount: {
        type: Sequelize.STRING,
      },
      prepareTime: {
        type: Sequelize.JSONB,
      },
      bankDetail: {
        type: Sequelize.JSONB,
      },
      proofOfIdentity: {
        type: Sequelize.JSONB,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("VirtualShops");
  },
};
