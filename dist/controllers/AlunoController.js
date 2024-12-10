"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class HomeController {
  async index(req, res) {
    const aluno = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename'],
      }
    });
    res.json(aluno);
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((err) => err.message),
      });

    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Necessário informar ID.'],
        })
      };

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        }
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      };

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((err) => err.message),
      });
    };
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        })
      };

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      };

      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((err) => err.message),
      });
    };

  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        })
      };

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      };

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((err) => err.message),
      });
    };

  }
}


exports. default = new HomeController();
