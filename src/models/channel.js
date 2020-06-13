export default (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'channel',
    {
      name: DataTypes.STRING,
      public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
  );

  Channel.associate = (models) => {
    // 1:M
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });

    // N:M relationship
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
  };

  return Channel;
};
