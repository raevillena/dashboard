# RMC Dashboard 3 - Distillation Monitoring System

A comprehensive real-time monitoring and control dashboard for distillation processes, built with Django REST Framework backend and React frontend with MQTT integration for IoT device communication.

## 🚀 Project Overview

This project is an industrial-grade distillation monitoring system that provides real-time control and monitoring capabilities for distillation equipment. It features a modern web interface for operators to monitor temperature, control pumps and heaters, track batch progress, and manage distillation records.

### Key Features

- **Real-time Monitoring**: Live temperature readings from condenser and other equipment
- **MQTT Integration**: Bidirectional communication with ESP32-based IoT devices
- **Batch Management**: Complete lifecycle tracking of distillation batches
- **User Authentication**: Secure login system with token-based authentication
- **Data Visualization**: Interactive charts and gauges for process monitoring
- **Control Interface**: Remote control of pumps, heaters, and other equipment
- **Record Management**: Historical data storage and retrieval
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

### Backend (Django)
- **Framework**: Django 3.0.2 with Django REST Framework
- **Database**: MySQL with custom models for records and sensor data
- **Authentication**: Knox token-based authentication
- **API**: RESTful API endpoints for data management

### Frontend (React)
- **Framework**: React 16.12.0 with Redux for state management
- **UI Library**: Material-UI components
- **Charts**: Chart.js and Chartist for data visualization
- **MQTT**: Real-time communication with IoT devices
- **Build Tool**: Webpack 4 for bundling

### IoT Integration
- **Protocol**: MQTT for device communication
- **Devices**: ESP32 microcontrollers
- **Topics**: Configurable MQTT topics for different sensors and controls

## 📁 Project Structure

```
dashboard/
├── dashboard/                 # Django project settings
│   ├── settings/             # Environment-specific settings
│   └── urls.py              # Main URL configuration
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── accounts/     # Authentication components
│   │   │   ├── cards/        # Dashboard card components
│   │   │   ├── leads/        # Main dashboard pages
│   │   │   ├── layout/       # Layout components
│   │   │   └── constants/    # Configuration constants
│   │   ├── actions/          # Redux actions
│   │   ├── reducers/         # Redux reducers
│   │   └── store.js          # Redux store configuration
│   └── static/              # Static files
├── stores/                   # Django app for data storage
│   ├── models.py            # Database models
│   ├── api.py               # API viewsets
│   └── serializers.py       # Data serializers
├── accounts/                 # Django app for user management
│   ├── api.py               # Authentication API
│   └── serializers.py       # User serializers
└── manage.py                # Django management script
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.7+
- Node.js 12+
- MySQL 5.7+
- MQTT Broker (e.g., Mosquitto)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure database**
   - Create MySQL database: `db_main_mmsu`
   - Update database credentials in `dashboard/settings/base.py`

5. **Run migrations**
   ```bash
   cd dashboard
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start Django server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Install Node.js dependencies**
   ```bash
   npm install
   ```

2. **Configure MQTT connection**
   - Update MQTT broker settings in `dashboard/frontend/src/components/constants/mqttconnectionstring.js`

3. **Build frontend**
   ```bash
   # Development build with watch mode
   npm run dev
   
   # Production build
   npm run build
   ```

## 🔧 Configuration

### MQTT Configuration

Update the MQTT connection settings in `dashboard/frontend/src/components/constants/mqttconnectionstring.js`:

```javascript
const connectionString = {
    host: "your-mqtt-broker",
    username: 'your-username',
    password: 'your-password',
    port: 9001,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
}
```

### MQTT Topics

The system uses predefined MQTT topics for communication:

- **Temperature Monitoring**: `esp32/d150/dev1/ctemperature`
- **Duty Cycle Control**: `esp32/d150/dev1/dutycycle/tx`
- **Progress Tracking**: `esp32/d150/dev1/progress`
- **Relay Control**: `esp32/d150/dev1/set/relay[1-6]`

### Database Configuration

Update database settings in `dashboard/dashboard/settings/base.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_database_name',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

## 📊 Data Models

### Record Model
- **recordID**: Unique identifier for each batch
- **start/end**: Timestamps for batch duration
- **duration**: Calculated batch duration
- **output_volume**: Volume of distilled product
- **status**: Current batch status (Active, Completed, etc.)
- **sap_***: Sap collection details (brix, volume, origin, etc.)

### RecordData Model
- **recordID**: Links to parent Record
- **data**: JSON string containing sensor readings
- **created_at**: Timestamp of data point

## 🎯 Usage

### Starting a New Batch

1. Navigate to the Records page
2. Click "New Batch" to create a new distillation record
3. Fill in sap collection details (brix, volume, origin, etc.)
4. Click "Start Recording" to begin monitoring

### Monitoring Active Batches

1. The dashboard automatically displays active batches
2. Real-time temperature readings from condenser
3. Control pumps and heaters using the interface
4. Monitor progress through visual indicators

### Viewing Historical Data

1. Access the Records page to view all batches
2. Filter by status, date, or other criteria
3. View detailed charts and data for completed batches
4. Export data for analysis

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/user/` - Get current user

### Records
- `GET /api/records/` - List all records
- `POST /api/records/` - Create new record
- `PUT /api/records/{id}/` - Update record
- `DELETE /api/records/{id}/` - Delete record

### Record Data
- `GET /api/recorddata/` - Get sensor data
- `POST /api/recorddata/` - Store sensor data

## 🚀 Deployment

### Production Settings

1. **Environment Variables**
   - Set `DEBUG=False`
   - Configure production database
   - Set secure `SECRET_KEY`

2. **Static Files**
   ```bash
   python manage.py collectstatic
   ```

3. **Web Server**
   - Use Gunicorn or similar WSGI server
   - Configure reverse proxy (Nginx)

4. **MQTT Broker**
   - Deploy Mosquitto or similar MQTT broker
   - Configure SSL/TLS for secure communication

## 🛡️ Security Considerations

- **Authentication**: Token-based authentication with Knox
- **CORS**: Configured for frontend-backend communication
- **MQTT Security**: Use SSL/TLS for MQTT connections
- **Database**: Use strong passwords and restrict access
- **Environment**: Keep sensitive data in environment variables

## 🔧 Development

### Adding New Sensors

1. **Define MQTT Topic**
   - Add topic constant in `topics.js`
   - Update MQTT client subscription

2. **Create Component**
   - Build React component for sensor display
   - Add to dashboard grid

3. **Update Redux**
   - Add actions and reducers for new data type
   - Update store configuration

### Customizing Dashboard

1. **Layout Changes**
   - Modify `DashboardGrid.js` for layout
   - Update Material-UI Grid components

2. **Styling**
   - Use Material-UI theming
   - Custom CSS for specific components

3. **Data Visualization**
   - Add new chart types using Chart.js
   - Create custom gauge components

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Raymart O. Villena**
- Industrial Automation & IoT Solutions
- Email: [your-email@domain.com]
- LinkedIn: [your-linkedin-profile]

## 🙏 Acknowledgments

- Material-UI for the component library
- Chart.js for data visualization
- Django REST Framework for the API
- React community for excellent documentation

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Note**: This system is designed for industrial use. Ensure proper testing and validation before deploying in production environments.