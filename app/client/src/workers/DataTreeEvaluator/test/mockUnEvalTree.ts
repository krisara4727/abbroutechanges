export const unEvalTree = {
  MainContainer: {
    widgetName: "MainContainer",
    backgroundColor: "none",
    rightColumn: 2220,
    snapColumns: 64,
    detachFromLayout: true,
    widgetId: "0",
    topRow: 0,
    bottomRow: 640,
    containerStyle: "none",
    snapRows: 113,
    parentRowSpace: 1,
    type: "CANVAS_WIDGET",
    canExtend: true,
    version: 52,
    minHeight: 620,
    parentColumnSpace: 1,
    dynamicBindingPathList: [],
    leftColumn: 0,
    children: ["j9dpft2lpu", "l0yem4eh6l"],
    defaultProps: {},
    defaultMetaProps: [],
    logBlackList: {},
    meta: {},
    propertyOverrideDependency: {},
    overridingPropertyPaths: {},
    reactivePaths: {},
    triggerPaths: {},
    validationPaths: {},
    ENTITY_TYPE: "WIDGET",
    privateWidgets: {},
  },
  Button1: {
    widgetName: "Button1",
    buttonColor: "#03B365",
    displayName: "Button",
    iconSVG: "/static/media/icon.cca02633.svg",
    topRow: 15,
    bottomRow: 19,
    parentRowSpace: 10,
    type: "BUTTON_WIDGET",
    hideCard: false,
    animateLoading: true,
    parentColumnSpace: 26.421875,
    dynamicTriggerPathList: [],
    leftColumn: 20,
    dynamicBindingPathList: [],
    text: "button1",
    isDisabled: false,
    key: "r6h8y6dc8i",
    rightColumn: 36,
    isDefaultClickDisabled: true,
    widgetId: "j9dpft2lpu",
    isVisible: true,
    recaptchaType: "V3",
    version: 1,
    parentId: "0",
    renderMode: "CANVAS",
    isLoading: false,
    buttonVariant: "PRIMARY",
    placement: "CENTER",
    defaultProps: {},
    defaultMetaProps: ["recaptchaToken"],
    logBlackList: {},
    meta: {},
    propertyOverrideDependency: {},
    overridingPropertyPaths: {},
    reactivePaths: {
      recaptchaToken: "TEMPLATE",
      text: "TEMPLATE",
      tooltip: "TEMPLATE",
      googleRecaptchaKey: "TEMPLATE",
      recaptchaType: "TEMPLATE",
      isVisible: "TEMPLATE",
      isDisabled: "TEMPLATE",
      animateLoading: "TEMPLATE",
      buttonVariant: "TEMPLATE",
      placement: "TEMPLATE",
    },
    triggerPaths: {
      onClick: true,
    },
    validationPaths: {
      text: {
        type: "TEXT",
      },
      tooltip: {
        type: "TEXT",
      },
      googleRecaptchaKey: {
        type: "TEXT",
      },
      recaptchaType: {
        type: "TEXT",
        params: {
          allowedValues: ["V3", "V2"],
          default: "V3",
        },
      },
      isVisible: {
        type: "BOOLEAN",
      },
      isDisabled: {
        type: "BOOLEAN",
      },
      animateLoading: {
        type: "BOOLEAN",
      },
      buttonVariant: {
        type: "TEXT",
        params: {
          allowedValues: ["PRIMARY", "SECONDARY", "TERTIARY"],
          default: "PRIMARY",
        },
      },
      placement: {
        type: "TEXT",
        params: {
          allowedValues: ["START", "BETWEEN", "CENTER"],
          default: "CENTER",
        },
      },
    },
    ENTITY_TYPE: "WIDGET",
    privateWidgets: {},
  },
  Button2: {
    widgetName: "Button2",
    buttonColor: "#03B365",
    displayName: "Button",
    iconSVG: "/static/media/icon.cca02633.svg",
    topRow: 25,
    bottomRow: 29,
    parentRowSpace: 10,
    type: "BUTTON_WIDGET",
    hideCard: false,
    animateLoading: true,
    parentColumnSpace: 26.421875,
    dynamicTriggerPathList: [],
    leftColumn: 20,
    dynamicBindingPathList: [
      {
        key: "text",
      },
    ],
    text: "{{Button1.text}}",
    isDisabled: false,
    key: "r6h8y6dc8i",
    rightColumn: 36,
    isDefaultClickDisabled: true,
    widgetId: "l0yem4eh6l",
    isVisible: true,
    recaptchaType: "V3",
    version: 1,
    parentId: "0",
    renderMode: "CANVAS",
    isLoading: false,
    buttonVariant: "PRIMARY",
    placement: "CENTER",
    defaultProps: {},
    defaultMetaProps: ["recaptchaToken"],
    logBlackList: {},
    meta: {},
    propertyOverrideDependency: {},
    overridingPropertyPaths: {},
    reactivePaths: {
      recaptchaToken: "TEMPLATE",
      text: "TEMPLATE",
      tooltip: "TEMPLATE",
      googleRecaptchaKey: "TEMPLATE",
      recaptchaType: "TEMPLATE",
      isVisible: "TEMPLATE",
      isDisabled: "TEMPLATE",
      animateLoading: "TEMPLATE",
      buttonVariant: "TEMPLATE",
      placement: "TEMPLATE",
    },
    triggerPaths: {
      onClick: true,
    },
    validationPaths: {
      text: {
        type: "TEXT",
      },
      tooltip: {
        type: "TEXT",
      },
      googleRecaptchaKey: {
        type: "TEXT",
      },
      recaptchaType: {
        type: "TEXT",
        params: {
          allowedValues: ["V3", "V2"],
          default: "V3",
        },
      },
      isVisible: {
        type: "BOOLEAN",
      },
      isDisabled: {
        type: "BOOLEAN",
      },
      animateLoading: {
        type: "BOOLEAN",
      },
      buttonVariant: {
        type: "TEXT",
        params: {
          allowedValues: ["PRIMARY", "SECONDARY", "TERTIARY"],
          default: "PRIMARY",
        },
      },
      placement: {
        type: "TEXT",
        params: {
          allowedValues: ["START", "BETWEEN", "CENTER"],
          default: "CENTER",
        },
      },
    },
    ENTITY_TYPE: "WIDGET",
    privateWidgets: {},
  },
  pageList: [
    {
      pageName: "Page1",
      pageId: "6200d1a2b5bfc0392b959cae",
      isDefault: true,
      isHidden: false,
    },
    {
      pageName: "Page2",
      pageId: "621e22cf2b75295c1c165fa6",
      isDefault: false,
      isHidden: false,
    },
    {
      pageName: "Page3",
      pageId: "6220c268c48234070f8ac65a",
      isDefault: false,
      isHidden: false,
    },
  ],
  appsmith: {
    user: {
      email: "rathod@appsmith.com",
      organizationIds: [
        "6218a61972ccd9145ec78c57",
        "621913df0276eb01d22fec44",
        "60caf8edb1e47a1315f0c48f",
        "609114fe05c4d35a9f6cbbf2",
      ],
      username: "rathod@appsmith.com",
      name: "Rishabh",
      commentOnboardingState: "RESOLVED",
      role: "engineer",
      useCase: "personal project",
      enableTelemetry: false,
      emptyInstance: false,
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
      isAnonymous: false,
      isEnabled: true,
      isSuperUser: false,
      isConfigurable: true,
    },
    URL: {
      fullPath:
        "https://dev.appsmith.com/applications/6200d1a2b5bfc0392b959cab/pages/6220c268c48234070f8ac65a/edit?a=b",
      host: "dev.appsmith.com",
      hostname: "dev.appsmith.com",
      queryParams: {
        a: "b",
      },
      protocol: "https:",
      pathname:
        "/applications/6200d1a2b5bfc0392b959cab/pages/6220c268c48234070f8ac65a/edit",
      port: "",
      hash: "",
    },
    store: {
      textColor: "#DF7E65",
    },
    geolocation: {
      canBeRequested: true,
    },
    mode: "EDIT",
    ENTITY_TYPE: "APPSMITH",
  },
};
