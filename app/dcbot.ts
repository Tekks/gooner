import { ActivityType, AutocompleteInteraction, Client, CommandInteraction, Events, Interaction, Message } from "discord.js";
import { CommandHandler, MessageHandler, UserListenerHandler } from "./handler/index.js";
import { Command, Config, MessageCommand, UserListener, Model } from "./interfaces/index.js";
import { BotConfig, CommandExport, Database, Logger } from "./utils/index.js";
import { PingCommand, VladeysFemboyParadiseCommand, WaifuCommand } from "./interactions/commands/index.js";
import { DogeMessage, VonzlerMessage } from "./interactions/message/index.js";
import { DogeListener, KarloListener } from "./interactions/userlistener/index.js";
import { Femboy } from "./models/index.js";


export class dcbot {

    private ready = false;
    public config: Config;
    public database: Database;

    public commands: Command[] = [
        new PingCommand(),
        new WaifuCommand(),
        new VladeysFemboyParadiseCommand(),
    ];

    public messageCommands: MessageCommand[] = [
        new DogeMessage(),
        new VonzlerMessage()
    ];

    public userListeners: UserListener[] = [
        new DogeListener(),
        new KarloListener()
    ];

    public databaseModels: Model[] = [
        Femboy
    ]

    
    private commandHandler = new CommandHandler();
    private messageHandler = new MessageHandler();
    private userListenerHandler = new UserListenerHandler();

    public constructor(public client: Client) {
        this.config = new BotConfig().init();
    }

    /**
     * Initialize
     */
    public async init() {
        this.registerEventlisteners();
        await CommandExport.import();
        this.database = await new Database().init();
        this.database.initModels(this.databaseModels);
        this.client.login(this.config.BOT.TOKEN);
    }

    /**
     * Register event listeners
     */
    private registerEventlisteners() {
        this.client.on(Events.ClientReady, async () => { this.onClientReady(); });
        this.client.on(Events.InteractionCreate, async (intr: Interaction) => { this.onInteraction(intr); });
        this.client.on(Events.MessageCreate, async (msg: Message) => { this.onMessage(msg); });
    }

    private async onClientReady() {
        this.client.user?.setPresence({ activities: [{ name: 'Cutie <3', type: ActivityType.Playing }] });
        Logger.info(`${this.client.user?.username}#${this.client.user.discriminator} || ${process.env.npm_package_version}`);
        this.ready = true;
    }

    private async onInteraction(intr: Interaction): Promise<void> {
        if (!this.ready) { return; }
        if (intr instanceof CommandInteraction || intr instanceof AutocompleteInteraction) {
            await this.commandHandler.process(intr);
        }
    }

    private async onMessage(msg: Message): Promise<void> {
        if (!this.ready) { return; }
        await this.userListenerHandler.process(msg);
        await this.messageHandler.process(msg);
    }
}