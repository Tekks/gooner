import { ActivityType, AutocompleteInteraction, Client, CommandInteraction, Events, Interaction, Message } from "discord.js";
import { CommandHandler, MessageHandler, UserListenerHandler } from "./handler/index.js";
import { Command, Config, MessageCommand, UserListener } from "./interfaces/index.js";
import { BotConfig, CommandExport, Logger } from "./utils/index.js";
import { PingCommand, TekksAiCommand, WaifuCommand } from "./interactions/commands/index.js";
import { DogeMessage, VonzlerMessage } from "./interactions/message/index.js";
import { DogeListener } from "./interactions/userlistener/index.js";


export class dcbot {

    private ready = false;
    public config: Config;

    public commands: Command[] = [
        new PingCommand(),
        new WaifuCommand(),
        // new TekksAiCommand()
    ]

    public messageCommands: MessageCommand[] = [
        new DogeMessage(),
        new VonzlerMessage()
    ]

    public userListeners: UserListener[] = [
        new DogeListener()
    ];

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
        Logger.info(`${this.client.user?.username} || ${process.env.npm_package_version}`);
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