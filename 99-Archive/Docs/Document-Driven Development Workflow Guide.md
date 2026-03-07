## Introduction  
Document-Driven Development (DDD) is a methodology that emphasizes thorough documentation before and throughout the development process. This approach ensures clear understanding of requirements, better architecture decisions, and more maintainable code. I'll guide you through each phase of this workflow.  
  
## Phase 1: Document  

### System Analysis 
- **Current System Assessment**
  - Review existing architecture and codebase
  - Identify integration points for the new feature
  - Document current limitations or technical debt that might affect implementation
### Feature Documentation
- **Requirements Documentation**
  - Functional requirements (what the feature must do)
  - Non-functional requirements (performance, security, scalability)
  - Constraints and limitations
  
- **User Stories**
  - Format: "As a [user type], I want [action] so that [benefit]"
  - Acceptance criteria for each story
  - Priority levels for implementation sequencing
  
- **Architecture Documentation**  
  - Component diagrams showing new and affected existing components  
  - Sequence diagrams for complex interactions  
  - Data models and database schema changes  
  
### Clarifying Questions  
- Who are the primary users of this feature?  
- What are the performance expectations?  
- Are there any regulatory or compliance requirements?  
- What are the security considerations?  
- How should the feature behave in error scenarios?  
- What are the integration points with existing systems?  
  
## Phase 2: Generate  
  
### Approach Evaluation  
- **Multiple Implementation Approaches**  
  - Present 2-3 different technical approaches  
  - For each approach, document:  
    - Implementation complexity  
    - Performance characteristics  
    - Scalability considerations  
    - Maintenance implications  
    - Technology requirements  
  
- **Code Generation**  
  - Create initial code structure (interfaces, classes, modules)  
  - Implement core functionality with detailed comments  
  - Document design patterns used and rationale  
  - Ensure alignment with documented requirements  
  
### Implementation Decisions  
- Document all technical decisions with reasoning  
- Highlight any deviations from initial documentation with justification  
- Address potential technical debt created  
  
## Phase 3: Test  
  
### Test Strategy  
- **Test Coverage Plan**  
  - Unit tests for individual components  
  - Integration tests for component interactions  
  - End-to-end tests for user workflows  
  - Performance tests for critical paths  
  
- **Test Case Development**  
  - Happy path scenarios  
  - Edge cases and boundary conditions  
  - Error handling and recovery scenarios  
  - Security testing scenarios  
  
- **Test Implementation**  
  - Write tests before or alongside implementation  
  - Ensure initial test failures when appropriate (TDD approach)  
  - Document test data requirements and setup  
  
## Phase 4: Refactor  
  
### Code Quality Assessment  
- **Code Review Checklist**  
  - Adherence to project coding standards  
  - Performance optimization opportunities  
  - Security vulnerability checks  
  - Duplication elimination  
  
- **Refactoring Approach**  
  - Identify code smells and technical debt  
  - Prioritize refactoring tasks  
  - Document before/after comparisons  
  - Maintain test coverage during refactoring  
  
### Optimization  
- Profile code for performance bottlenecks  
- Optimize database queries and data access patterns  
- Improve error handling and logging  
- Enhance user experience elements  
  
## Phase 5: Update Documentation  
  
### Documentation Revision  
- Update all technical documentation to reflect implementation  
- Revise architecture diagrams and sequence flows  
- Update API documentation and usage examples  
- Document known limitations and future enhancement opportunities  
  
### Knowledge Sharing  
- **Lessons Learned**  
  - Technical challenges encountered and solutions  
  - Unexpected complexities and how they were addressed  
  - Performance insights gained  
  - Reusable patterns or components created  
  
- **Maintenance Guide**  
  - Troubleshooting common issues  
  - Configuration options and their effects  
  - Monitoring and logging guidance  
  - Upgrade and migration considerations  
  
## Continuous Feedback Loop  
Throughout all phases:  
- Seek stakeholder feedback regularly  
- Conduct peer reviews of documentation and code  
- Validate assumptions with quick prototypes when necessary  
- Adjust documentation and implementation based on new insights  
  
## Deliverables Checklist  
- [ ] Complete feature requirements document  
- [ ] Architecture and design documentation  
- [ ] Implementation approach comparison  
- [ ] Working code with inline documentation  
- [ ] Comprehensive test suite  
- [ ] Refactoring and optimization report  
- [ ] Updated technical documentation  
- [ ] Lessons learned summary  
  
By following this Document-Driven Development workflow, you'll create features that are well-designed, thoroughly tested, and properly documented, leading to higher quality software and easier maintenance.