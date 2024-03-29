import { Materia } from '../models/Materia.js';
import multer from 'multer';
import xlsx from 'xlsx';

export const getMaterias = async (req, res) => {
    try {
        const materias = await Materia.findAll();
        res.json(materias);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMateria = async (req, res) => {
    try {
        const { id_materia } = req.params;
        const materia = await Materia.findOne({ where: { id_materia } });
        if (!materia) return res.status(404).json({ message: "La materia no existe" });
        res.json(materia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createMateria = async (req, res) => {
    const { nombre_materia, nivel_materia } = req.body;
    try {
        const newMateria = await Materia.create({ nombre_materia, nivel_materia });
        res.json(newMateria);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateMateria = async (req, res) => {
    try {
        const { id_materia } = req.params;
        const { nombre_materia, nivel_materia } = req.body;

        const materia = await Materia.findByPk(id_materia);
        materia.nombre_materia = nombre_materia;
        materia.nivel_materia = nivel_materia;

        await materia.save();

        res.json(materia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMateria = async (req, res) => {
    try {
        const { id_materia } = req.params;
        await Materia.destroy({ where: { id_materia } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

///////////////////SUBIR ARCHIVO ESCEL//////////////////////


export const uploadExcel = async (req, res) => {
    try {
        // Verifica si se proporcionó un archivo
        if (!req.file) {
            return res.status(400).json({ mensaje: 'No se proporcionó ningún archivo' });
        }
        
        // Lee el archivo de Excel
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Suponiendo que deseas trabajar con la primera hoja
        const worksheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(worksheet);
        
        // Aquí puedes hacer lo que necesites con los datos de Excel
        console.log('Datos de Excel:', excelData);
        
        // Devuelve los datos de Excel como respuesta
        return res.json({ excelData });
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso de lectura del archivo de Excel
        return res.status(500).json({ message: 'Error al leer archivo Excel', error: error.message });
    }
};

