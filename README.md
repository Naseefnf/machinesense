---

## 🔒 Security

- JWT tokens with role-based access (Manager/Employee)
- bcrypt password hashing
- Complete multi-tenant data isolation
- All database queries filtered by company_id
- Per-company isolated image storage
- Per-company isolated ML models

---

## 🌍 Multi-Tenancy

Each company gets:
- Private account and workspace
- Isolated image storage (`uploads/{company_id}/`)
- Their own trained AI model (`{company_id}_model.h5`)
- Their own machine database
- No data ever shared between companies

---

## 🚀 Production Deployment

For real factory deployment with full ML capabilities:

```bash
# On a VPS (DigitalOcean, AWS, etc.)
git clone https://github.com/Naseefnf/machinesense.git
cd machinesense
docker-compose up --build -d
```

Recommended: 2GB+ RAM for TensorFlow ML pipeline

---

## 👨‍💻 Author

**Mohammed Naseef**
- GitHub: [@Naseefnf](https://github.com/Naseefnf)

---

## 📄 License

MIT License — feel free to use this project as a reference!

---

*Built with ❤️ to solve a real factory floor problem*
