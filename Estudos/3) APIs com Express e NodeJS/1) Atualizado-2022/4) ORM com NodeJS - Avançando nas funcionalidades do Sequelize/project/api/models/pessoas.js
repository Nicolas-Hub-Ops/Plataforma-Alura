'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        validaName: function(data) {
          if(data.length <= 3) throw new Error('O campo nome deve apresentar mais de 3 letras.')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dado do tipo E-mail está inválida'
        }
      }
    },
    role: DataTypes.STRING
  }, { 
      paranoid: true,
      defaultScope: {
        where: { ativo: true }
      },
      scopes: {
        todos: { where: {} }
      }
    })
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    }) 
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: { status: 'confirmado' },
      as: 'aulasMatriculas'
    })

  }
  return Pessoas
}