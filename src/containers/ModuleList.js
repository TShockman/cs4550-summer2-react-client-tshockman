import React from 'react';
import PropTypes from 'prop-types';
import ModuleListItem from '../components/ModuleListItem';
import ModuleCreationForm from '../components/ModuleCreationForm';
import ModuleService from '../services/ModuleServiceClient';

export default class ModuleList extends React.Component {
  static propTypes = {
    courseId: PropTypes.number.isRequired,
    selectModule: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.moduleService = ModuleService.instance;
    this.state = {
      courseId: this.props.courseId,
      modules: []
    }
  }

  componentDidMount() {
    this.loadModules();
  }

  handleSubmit = module => {
    const {courseId} = this.props;
    this.moduleService.createModule(courseId, module)
      .then(this.loadModules);
  };

  loadModules = () => {
    this.moduleService.findAllModulesForCourse(this.state.courseId)
      .then(modules => {
        const modulesWithCourseId = modules.map(module => {
          module.course = {id: this.state.courseId};
          return module;
        });
        this.setState({modules: modulesWithCourseId});
      });
  };

  render() {
    const {selectModule} = this.props;
    const {modules} = this.state;

    let list;
    if (!modules.length) {
      list = 'No modules! Create one below.';
    } else {
      list = modules.map(module => <ModuleListItem key={module.id} module={module} selectModule={selectModule}/>)
    }

    return (
      <div>
        {list}
        <ModuleCreationForm onSubmitModule={this.handleSubmit}/>
      </div>
    )
  }
}