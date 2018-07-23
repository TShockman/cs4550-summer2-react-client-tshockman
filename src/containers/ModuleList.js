import React from 'react';
import PropTypes from 'prop-types';
import ModuleListItem from '../components/ModuleListItem';
import ModuleCreationForm from '../components/ModuleCreationForm';
import ModuleService from '../services/ModuleServiceClient';

export default class ModuleList extends React.Component {
  static propTypes = {
    courseId: PropTypes.number.isRequired,
    selectModule: PropTypes.func.isRequired,
    selectedModuleId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.moduleService = ModuleService.instance;
    this.state = {
      modules: []
    };
  }

  componentDidMount() {
    this.loadModules()
      .then(() => {
        const {modules} = this.state;
        if (modules.length) {
          this.props.selectModule(modules[0]);
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.courseId !== this.props.courseId) {
      this.loadModules();
    }
  }

  handleSubmit = module => {
    const {courseId} = this.props;
    this.moduleService.createModule(courseId, module)
      .then(this.loadModules);
  };

  loadModules = () => {
    const {courseId} = this.props;
    return this.moduleService.findAllModulesForCourse(courseId)
      .then(modules => {
        const modulesWithCourseId = modules.map(module => {
          module.course = {id: courseId};
          return module;
        });
        this.setState({modules: modulesWithCourseId});
      });
  };

  deleteModule = module => {
    const {selectModule} = this.props;
    this.moduleService.deleteModule(module)
      .then(this.loadModules)
      .then(() => {
        const {modules} = this.state;
        selectModule(modules.find(search => search.id !== module.id));
      });
  };

  getModuleList = () => {
    const {selectModule, selectedModuleId} = this.props;
    const {modules} = this.state;

    if (!modules.length) {
      return 'No modules! Create one below.';
    }
    return(
      <ul className="nav nav-pills flex-column">
        {modules.map(module => {
          return <ModuleListItem key={module.id} active={module.id === selectedModuleId} module={module} selectModule={selectModule} deleteModule={this.deleteModule}/>
        })}
      </ul>
    );
  };

  render() {
    return (
      <div>
        {this.getModuleList()}
        <ModuleCreationForm onSubmitModule={this.handleSubmit}/>
      </div>
    )
  }
}