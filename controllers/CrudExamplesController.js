const CrudExample = require('../models/CrudExample');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const crudExamples = await CrudExample.find();
            res.status(200).json({
                message: "CrudExamples retrivied successfully!",
                crudExamples: crudExamples
            });
        }
        catch(err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        const crudExample = new CrudExample(req.body);
        try {
            const saved_crudExample = await crudExample.save();
            res.status(200).json({
                message: "CrudExample added successfully!",
                crudExample: saved_crudExample
            });
        } 
        catch(err) {
            next(err);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const crudExample = await CrudExample.findById(req.params.id);
            res.status(200).json({
                message: "CrudExample retrivied successfully!",
                crudExample: crudExample
            });
        } catch(err) {
            next(err);
        }
    },
    edit: async (req, res, next) => {
        try {
            const updated_crudExample = await CrudExample.updateOne({_id: req.params.id}, req.body);
            res.status(200).json({
                message: "CrudExample updated successfully!",
                crudExample: updated_crudExample
            });
        }
        catch(err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            await CrudExample.deleteOne({_id: req.params.id})
            res.status(200).json({
                message: "CrudExample deleted successfully!"
            });
        }
        catch(err) {
            next(err);
        }
    }
}